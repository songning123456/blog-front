import {shardMerge, shardUpload, fileIsExist} from '../service/http';
import Common from './Common';
import md5 from 'js-md5';

let upload = {};
export const uploadByPieces = ({file, fileType, pieceSize = 10, progress, success, error}) => {
    upload.chunkSize = pieceSize * 1024 * 1024; // 10MB/片
    upload.chunkCount = Math.ceil(file.size / upload.chunkSize); // 总片数
    upload.hasExist = []; // 某个文件已经上传的部分
    upload.progressIndex = 0;
    const readFile = () => {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.addEventListener('load', e => {
            let fileBlob = e.target.result;
            upload.md5 = md5(fileBlob);
            fileIsExist({fileType: fileType, md5: upload.md5}).then(data => {
                if (data.status === 200) {
                    if (!data.data) {
                        // 文件已经上传
                        success && success({isExist: true});
                    } else if (data.data && data.data.length > 0) {
                        // 已经上传的部分
                        upload.hasExist = data.data;
                        readChunk();
                    }
                } else {
                    readChunk();
                }
            }).catch(e => {
                error && error(e);
            });
        });
    };
    // 获取分片相关信息
    const getChunkInfo = (file, currentChunk, chunkSize) => {
        let start = currentChunk * chunkSize;
        let end = Math.min(file.size, start + chunkSize);
        let chunk = file.slice(start, end);
        return {
            start, end, chunk
        };
    };
    const readChunk = () => {
        let promiseAll = [];
        for (let i = 0; i < upload.chunkCount; i++) {
            // 已经存在的分片无需上传
            if (!upload.hasExist.includes(i)) {
                const {chunk} = getChunkInfo(file, i, upload.chunkSize);
                promiseAll.push(uploadChunk({chunk, currentChunk: i}));
            }
        }
        // 存在某些分片未上传
        if (promiseAll.length > 0) {
            progress(Common.keepDecimal(upload.hasExist * (90 / upload.chunkCount), 2));
            success && success({showProgress: true});
            Promise.all(promiseAll).then(result => {
                if (!result.includes('fail')) {
                    // 所有分片都已经上传成功，准备合并
                    mergeChunk();
                }
            }).catch(e => {
                error && error(e);
            });
        } else {
            // 说明所有的分片已经上传，仅仅未合并
            mergeChunk();
        }
    };
    // 合并分片
    const mergeChunk = () => {
        shardMerge({fileType: fileType, md5: upload.md5, fileName: file.name}).then(data => {
            if (data.status === 200) {
                progress(100);
                success && success({shardMerge: true, hideProgress: true});
            } else {
                error && error(data.message);
            }
        }).catch(e => {
            error && error(e);
        });
    };
    // 上传分片
    const uploadChunk = ({chunk, currentChunk}) => {
        let formData = new FormData();
        formData.append('file', chunk);
        formData.append('fileType', fileType);
        formData.append('md5', upload.md5);
        formData.append('fileName', file.name);
        formData.append('currentChunk', currentChunk);
        return new Promise((resolve, reject) => {
            shardUpload(formData).then(data => {
                if (data.status === 200) {
                    progress(Common.keepDecimal((++upload.progressIndex + upload.hasExist) * (90 / upload.chunkCount), 2));
                    resolve('success');
                } else {
                    reject('fail');
                }
            }).catch(e => {
                reject('fail');
            });
        });
    };
    readFile();
};


