new MiniSandbox({
    el: '#sandbox',//要和 markdown 文件中 div 元素的 id 一致
    files: {//各 tab 页面
        //index.html=>html
        //index.css=>css
        //index.js=>js
        'index.html': {
            title: 'HTML',//tab 上显示的名字
            defaultValue: `<h1>JavaScript</h1>
<p id="demo">
    JavaScript 能改变 HTML 元素的样式。
</p>
<button>点击这里</button>
            `,//HTML的内容/代码
            cssLibs: ['index.css'],//html引入的css
            jsLibs: ['index.js'],//html引入的js
        },
        'index.css': {
            title: 'CSS',
            defaultValue: `h1{
    background: red;
}
`
        },
        'index.js': {
            title: 'JS',
            //JS的内容/代码
            defaultValue: `const btn = document.querySelector('button')
btn.addEventListener('click', () => {
    document.getElementById("demo").style.color
    ="#ff0000";
})
`
        }
    },
    //用来设置一些 Sandbox 的默认配置
    defaultConfig: {
        height: '300px',//Sandbox 的高度, 默认为 '300px'
        autoRun: true,//每次修改后是否自动运行, 默认等于 true
        autoRunInterval: 1000,//每次自动运行的时间间隔, 单位为毫秒, 默认等于 300
        editorRange: '50%',//编辑区域默认占比, 默认情况下编辑区域占 50%
        draggable: true,//是否可以左右拖动布局, 默认为 true
        direction: 'row',//控制上下/左右布局, 默认为 'row'。'row' | 'row-reverse' | 'column' | 'column-reverse'
      }
})