$(function(){
    //添加事件
    $(document).on('mousedown',function(e){
        var obj= e.target;
        var ox= e.offsetX;
        var oy= e.offsetY;
        $(document).on('mousemove',function(e){
            var px= e.pageX;
            var py= e.pageY;
            $(obj).trigger('drag',{left:px-ox,top:py-oy})
        })
        $(document).on('mouseup',function(){
            $(document).off('mouseup');
            $(document).off('mousemove')
        })
    })
    //输入框的动画
    //按钮
   var formclose=$('.formclose');
   var add=$('.add');
   var form=$('form');
   var flag=true;
   add.click(function(){
      if(flag){
          form.attr({'data-a':'animate-down'}).css('display','block');
          flag=false;
      }else{
          form.attr({'data-a':'animate-up'}).css('display','none');
          flag=true;
      }
   })
    formclose.click(function(){
        form.attr({'data-a':'animate-up'}).css('display','none');
        flag=true;
    })
    //表单验证
    var submitbtn=$('.submitbtn');
    submitbtn.click(function(){
        var textv=form.find(':text').val();
        var textav=form.find('textarea').val();
        var timev=form.find('#time').val();
        if(textv==''){
            alert('标题不能为空');
            return;
        }
        if(textav==''){
            alert('内容不能为空');
            return;
        }
        if(timev==''){
            alert('时间必选');
            return;
        }
        //存储
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);
        var obj={title:textv,con:textav,time:timev,id:new Date().getTime()};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(':text').val('');
        form.find('textarea').val('');
        form.find('#time').val('');
        //显示
        var copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$('.con').outerWidth())*Math.random(),
            top:($(window).height()-$('.con').outerHeight())*Math.random()
        }).attr('data-a','animate-sd').attr('id',obj.id);
        copy.find('.title-con').html(textv);
        copy.find('.con-con').html(textav);
        copy.find('.time-con').html(timev);
    })
    //页面加载显示已经保存的信息
    var messages=localStorage.message==null?[]:JSON.parse(localStorage.message);
    for(var i=0;i<messages.length;i++){
        copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$('.con').outerWidth())*Math.random(),
            top:($(window).height()-$('.con').outerHeight())*Math.random()
        }).attr('id',messages[i].id);
        copy.find('.title-con').html(messages[i].textv);
        copy.find('.con-con').html(messages[i].textav);
        copy.find('.time-con').html(messages[i].timev);
    }
    //拖拽
    $(document).delegate('.con','drag',function(e,data){
        $(this).css({
            left:data.left,
            top:data.top
        })
    })
    $(document).delegate('.con','mousedown',function(e){
        $('.con').css({zIndex:0});
        $(this).css({zIndex:1});
        e.preventDefault()
    })
    //删除
    $(document).delegate('.close','click',function() {
        var id=$(this).parent().attr('id');
        var arr=JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                arr.splice(i,1);
                localStorage.message=JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })

})