/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
var aqiData = {};/*存储用户输入的空气指数数据*/
var cityInput = document.getElementById("aqi-city-input");
var aqiInput = document.getElementById("aqi-value-input");

function addAqiData() {
    var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();     /*获取用户输入内容，进行前后去空格及空字符处理（trim）*/

    /*验证输入合法性*/

    if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){            /*match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
                                                              该方法类似 indexOf() 和 lastIndexOf()，但是它返回指定的值，而不是字符串的位置。*/
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!aqi.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city] = aqi;/*将用户输入的通过验证的数据加入数组*/
}
/*
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var showtable = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var city in aqiData){
        showtable += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? showtable : "";
}

function addBtnHandle() {
    addAqiData();
    renderAqiList();
}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];  /*delete方法删除数组，这种方式数组长度不变*/
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").addEventListener("click", addBtnHandle)
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click", function(event){
        if(event.target.nodeName.toLowerCase() === 'button') delBtnHandle.call(null, event.target.dataset.city);
    })
}
/*  此处事件代理，判断时间源目标是否为button标签。target.dataset.city方法查询到要删除的city属性的按钮。*/

init();