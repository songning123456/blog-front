import {shardMerge, shardUpload, videoIsExist} from '../service/request';
import md5 from 'js-md5';

let upload = {};
export const uploadByPieces = ({file, pieceSize = 10, progress, success, error}) => {
    upload.chunkSize = pieceSize * 1024 * 1024; // 10MB/片
    upload.chunkCount = Math.ceil(file.size / upload.chunkSize); // 总片数
    const readFile = () => {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(file);
        fileReader.addEventListener('load', e => {
            let fileBlob = e.target.result;
            upload.md5 = md5(fileBlob);
            videoIsExist({md5: upload.md5}).then(data => {
                if (data.status === 200) {
                    // 文件已经上传
                    success && success(data);
                } else {
                    readChunk();
                }
            }).catch(e => {
                error && error(e);
            });
        });
    };
    const getChunkInfo = (file, currentChunk, chunkSize) => {
        let start = currentChunk * chunkSize;
        let end = Math.min(file.size, start + chunkSize);
        let chunk = file.slice(start, end);
        return {
            start, end, chunk
        };
    };
    const readChunk = () => {
        for (let i = 0; i < upload.chunkCount; i++) {
            const {chunk} = getChunkInfo(file, i, upload.chunkSize);
            uploadChunk({chunk, currentChunk: i, chunkCount: upload.chunkCount});
        }
    };
    const uploadChunk = ({chunk, currentChunk, chunkCount}) => {
        let formData = new FormData();
        formData.append('file', chunk);
        formData.append('md5', upload.md5);
        formData.append('filename', file.name);
        formData.append('currentChunk', currentChunk);
        shardUpload(formData).then(data => {
            if (data.status === 200) {
                if (currentChunk >= chunkCount - 1) {
                    shardMerge({md5: upload.md5, filename: file.name}).then(data => {
                        if (data.status === 200) {
                            success && success(data);
                        }
                    }).catch(e => {
                        error && error(e);
                    });
                }
            }
        }).catch(e => {
            error && error(e);
        });
    };
    readFile();
};


