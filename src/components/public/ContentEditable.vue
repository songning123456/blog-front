<template>
    <div class="content-editable" ref='contentEditable' contenteditable="true" v-html="innerHTML" @input='changeHTML'
         @focus="focusEvent" @blur="blurEvent"></div>
</template>

<script>
    export default {
        name: 'ContentEditable',
        props: {
            value: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                innerHTML: '',
                lock: false
            };
        },
        watch: {
            value () {
                if (!this.lock || !this.innerHTML) {
                    this.innerHTML = this.value;
                    if (this.lock) {
                        // 初次进入， 光标移至最后
                        this.$nextTick(() => {
                            this.cursor2Last(this.$refs['contentEditable']);
                        });
                    }
                }
            }
        },
        methods: {
            focusEvent (e) {
                this.lock = true;
            },
            blurEvent (e) {
                this.lock = false;
            },
            changeHTML (e) {
                this.$emit('input', e.target.innerHTML);
            },
            cursor2Last (el) {
                el.focus(); //解决ff不获取焦点无法定位问题
                let range = window.getSelection(); //创建range
                range.selectAllChildren(el); //range 选择obj下所有子内容
                range.collapseToEnd(); //光标移至最后
            },
            insertImg (Img) {
                let el = this.$refs['contentEditable'];
                let range, node;
                if (!el.hasfocus) {
                    el.focus();
                }
                if (window.getSelection && window.getSelection().getRangeAt) {
                    range = window.getSelection().getRangeAt(0);
                    range.collapse(false);
                    node = range.createContextualFragment(Img);
                    let lastChild = node.lastChild;
                    range.insertNode(node);
                    if (lastChild) {
                        range.setEndAfter(lastChild);
                        range.setStartAfter(lastChild);
                    }
                    let selection = window.getSelection();
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else if (document.selection && document.selection.createRange) {
                    document.selection.createRange().pasteHTML(Img);
                }
                this.$emit('input', el.innerHTML);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .content-editable {
        width: 100%;
        height: 100%;

        outline: none;
        text-align: left;
        overflow: auto;
        word-break: break-all;
        user-select: text;
        white-space: pre-wrap;

        &[contenteditable=true] {
            user-modify: read-write-plaintext-only;

            &:empty:before {
                content: attr(placeholder);
                display: block;
                color: #ccc;
            }
        }

        &::-webkit-scrollbar {
            width: 3px;
        }
    }

</style>
