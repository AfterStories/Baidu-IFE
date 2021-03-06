/**
 * Created by wangtingdong on 16/4/15.
 */

//定义ShowTag构造器
function ShowTag(ipt,box) {
    this.arr = [];      //存放数组
    this.box = box;     //显示tag的容器
    this.ipt = ipt;     //输入框
    this.length = 100;   //显示的tag的数目
}


//ShowTag构造器方法
ShowTag.prototype= {
    

    // 添加选项时，去重
    trim: function () {
       
        for ( var i = 0, j = 0; i < this.arr.length; i++) {      //判断重复，如果元素重复就去掉该元素
            for (j = i + 1; j < this.arr.length; j++) {          //使用户无法输入重复的选项词
                if (this.arr[i] == this.arr[j]) {
                    this.arr.splice(j, 1);   //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
                    j--;
                }
            }
        }
        while (this.arr.length > this.length) {
            this.arr.shift();    //shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
        }                       // 当添加的标签大于100个，则删去第一个添加的标签。
        this.show();//去重后重新显示标签
        return this;
    },




    //显示标签
    show: function () {
        var text = '';
        for (var index = 0; index < this.arr.length; index++) {
            text += '<div data-num="' + index + '" class="item"><span>点击删除</span>' + this.arr[index] + '</div>';
        }
        this.box.innerHTML = text;
        return this;
    },


    //将输入的值添加到数组中
    add: function () {
        str = this.ipt.value.split(/[ ,、， \n\t]/);   //回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔
        for (var i = 0; i < str.length; i++) {
            var item = str[i];
            if (item == '') {     //去掉空元素
            }
            else {
                this.arr.push(item);
            }
        }
        this.trim();   //调用上面的去重函数。
                         
                          
        return this;
    },


    //点击元素删除
    deleteEvent: function (e) {
        //事件代理，判断点击的元素
        var item = e.target.className == 'item' ? e.target : e.target.parentNode.className == 'item' ? e.target.parentNode : null;
        if (item == null) {  // 判断点击的元素是类名为item的红色方块标签吗？是的话则是时间目标元素，赋给变量item，不是的话
            return 0;        // 那点击的会是item元素里边的节点吗？判断如果点击元素的父节点是item，那也算是点到item红色标签了
        }
        //删除第n个元素，之后重新显示元素
        this.arr.splice(item.getAttribute('data-num'), 1);
        this.show();
    },


    getData: function () {
        return this.arr;
    }
};




//定义TagIpt构造器
function TagIpt(tag_ipt,tag_box) {
    // 调用父类构造器, 确保(使用Function#call)"this" 在调用过程中设置正确
    ShowTag.call(this, tag_ipt, tag_box);
}

// 建立一个由ShowTag.prototype继承而来的TagIpt.prototype对象.
TagIpt.prototype=Object.create(ShowTag.prototype);
// 设置"constructor" 属性指向ShowTag
TagIpt.prototype.constructor=ShowTag;

TagIpt.prototype.init=function() {
    //绑定事件
    on(this.box, 'click', this.deleteEvent.bind(this));//删除元素事件的绑定
    on(this.ipt, 'keyup', this.keyUp.bind(this));    //输入框输入内容事件的绑定
    on(this.ipt, 'keydown', this.preventDefault);    //阻止输入框的默认事件
};
TagIpt.prototype.keyUp=function(e) {
    if (e.keyCode == 188 || e.keyCode == 32 || e.keyCode == '13') {   //键盘码：逗号、空格、回车
        this.add();
        this.ipt.value = '';
    }
};
TagIpt.prototype.preventDefault=function(e) {
    if (e.keyCode == '13') {
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
                           //event.preventDefault()方法是用于取消事件的默认行为
                          //但此方法并不被ie支持，在ie下需要用window.event.returnValue = false; 来实现。
    }
};