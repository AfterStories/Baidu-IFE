

//切换页面选项功能//

function radioChange() {
    if (document.getElementById("inSchoolRadio").checked) {
        document.querySelector(".inSchool").className = "inSchool";
        document.querySelector(".outSchool").className = "outSchool hide";
    }
    else {
        document.querySelector(".inSchool").className = "inSchool hide";
        document.querySelector(".outSchool").className = "outSchool";
    }
}


//二级表单联动功能//





function selectschool(){

	
	
	var data = {beijing:["北京大学", "清华大学", "北京航空航天大学"],shanghai:["复旦大学", "上海交通大学", "同济大学"],zhejiang:["浙江大学", "杭州电子科技大学", "浙江工业大学"]
	}
		//储存数据
    var cityname = document.getElementById('select1'); //获取城市数据
	var universityname = document.getElementById('select2');//获取大学数据
	var selected = cityname.options[cityname.selectedIndex].value;   /selectedIndex 属性可设置或返回下拉列表中被选选项的索引号。这里得到被选城市名/
	universityname.innerHTML='';
	
	for (var i = 0; i < data[selected].length; i++) {  
		var opted = document.createElement('option');    //创建选项
		opted.value = data[selected][i]; 			 //选项的值设置备选城市名中第i个学校名
		opted.innerHTML = data[selected][i];  //输出学校名到选项里
		document.getElementById('select2').appendChild(opted); //学校选项输出到select2里
	}



}
