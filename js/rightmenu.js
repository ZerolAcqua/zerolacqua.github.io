let rmf = {};
rmf.showRightMenu = function(isTrue, x=0, y=0){
    let $rightMenu = $('#rightMenu');
    $rightMenu.css('top',x+'px').css('left',y+'px');

    if(isTrue){
        $rightMenu.show();
    }else{
        $rightMenu.hide();
    }
}
//黑夜模式
rmf.switchDarkMode = function(){
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
        activateDarkMode()
        saveToLocal.set('theme', 'dark', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
        setTimeout(switchPostChart, 100)
    } else {
        activateLightMode()
        saveToLocal.set('theme', 'light', 2)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
        setTimeout(switchPostChart, 100)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
};
//阅读模式
rmf.switchReadMode = function(){
    const $body = document.body
    $body.classList.add('read-mode')
    const newEle = document.createElement('button')
    newEle.type = 'button'
    newEle.className = 'fas fa-sign-out-alt exit-readmode'
    $body.appendChild(newEle)

    function clickFn () {
        $body.classList.remove('read-mode')
        newEle.remove()
        newEle.removeEventListener('click', clickFn)
    }

    newEle.addEventListener('click', clickFn)
}
//单双栏切换
rmf.switchAsideMode = function(){
    const $htmlDom = document.documentElement.classList
    $htmlDom.contains('hide-aside')
      ? saveToLocal.set('aside-status', 'show', 2)
      : saveToLocal.set('aside-status', 'hide', 2)
    $htmlDom.toggle('hide-aside')
}
//Sakana开关
rmf.switchSakanaStatus = function(){
    if(!saveToLocal.get('sakana-status'))
        saveToLocal.set('sakana-status', 'show', 2)
    let sakanaStatus = saveToLocal.get('sakana-status')
    
    if(sakanaStatus=='show'){
        $('#sakana').fadeOut();
        saveToLocal.set('sakana-status', 'hide', 2)
        $('#menu-sakana').children("i").addClass('fa-toggle-off')
        $('#menu-sakana').children("i").removeClass('fa-toggle-on')
    }
    else{
        $('#sakana').fadeIn();
        saveToLocal.set('sakana-status', 'show', 2)
        $('#menu-sakana').children("i").addClass('fa-toggle-on')
        $('#menu-sakana').children("i").removeClass('fa-toggle-ff')
    }
    //开关状态
}
//复制选中文字
rmf.copySelect = function(){
    document.execCommand('Copy',false,null);
    //这里可以写点东西提示一下 已复制
}

//回到顶部
rmf.scrollToTop = function(){
    btf.scrollToDest(0, 500);
}

// 右键菜单事件
if(! (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){

    var ctrlDown = false;
    document.addEventListener('keydown',function(event){if(event.key=="Control")ctrlDown=true;});
    document.addEventListener('keyup',function(event){if(event.key=="Control")ctrlDown=false;});
    
    window.oncontextmenu = function(event){
        if(!ctrlDown&& !document.body.classList.contains("read-mode"))
        {
            $('.rightMenu-group.hide').hide();
            //如果有文字选中，则显示文字选中相关的菜单项
            if(document.getSelection().toString()){
                $('#menu-text').show();
            }
            //评论存在，则显示直达评论菜单项
            if(document.getElementById("post-comment")){
                $('#menu-comment').show();
            }
            else{
                $('#menu-comment').hide();
            }
            //石蒜模拟器状态
            let sakanaStatus = saveToLocal.get('sakana-status')
            if(sakanaStatus=='show'){
                $('#menu-sakana').children("i").removeClass('fa-toggle-off')
                $('#menu-sakana').children("i").addClass('fa-toggle-on')
            }
            else{
                $('#menu-sakana').children("i").removeClass('fa-toggle-on')
                $('#menu-sakana').children("i").addClass('fa-toggle-off')
            }
            let pageX = event.clientX + 10;
            let pageY = event.clientY;
            let rmWidth = $('#rightMenu').width();
            let rmHeight = $('#rightMenu').height();
            if(pageX + rmWidth > window.innerWidth){
                pageX -= rmWidth+10;
            }
            if(pageY + rmHeight > window.innerHeight){
                pageY -= pageY + rmHeight - window.innerHeight;
            }

            rmf.showRightMenu(true, pageY, pageX);

            return false;
        }
        else
        {
            ctrlDown = false;
            rmf.showRightMenu(false);
            return true;
        }
    };


    window.addEventListener('click',function(){rmf.showRightMenu(false);});
}