CE.ready(function(){
	var DOC = window.document;
	var main = DOC.getElementById('main');


	//初始化数的结构
	var levelObj = [
		{title:'第一'},
		{title:'第二',Child:[{title:'第四'},{title:'第五'},{title:'第六'}]},
		{title:'第三'}
	];

	//树和内容绑定
	var bindTreeMain=[];


	//画树
	function createUl(parent,obj,level,bindTreeMain){
		var ul = DOC.createElement('ul');
		CE.addClass(ul,'nav-'+level);
		for(var i in obj){
			var levelOne = obj[i];
			var li = DOC.createElement('li');
			var a = DOC.createElement('a');
			a.href = '#'+levelOne.title;
			a.innerHTML = levelOne.title;
			li.appendChild(a);

			//绑定数和内容
			var MainEl = DOC.getElementById(levelOne.title);
			if(!MainEl){
				throw(levelOne.title+'不存在');
			}
			var btmOne = {
				treeEl:li,
				MainElOffsetTop:MainEl.offsetTop+main.offsetTop+10
			};
			//如果不是第一层
			if(level!==0){
				btmOne['parent']=parent;	
			}
			bindTreeMain.push(btmOne);

			if(levelOne.Child){
				createUl(li,levelOne.Child,level+1,bindTreeMain);
			}
			ul.appendChild(li);
			parent.appendChild(ul);
		}
	}

	var nav = DOC.getElementById('nav');
	createUl(nav,levelObj,0,bindTreeMain);
	
	var currentBindTreeMain;
	
	window.onscroll = window.onresize = function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var offsetScrollTop = scrollTop	+ document.documentElement.clientHeight;
		for(var i in bindTreeMain){
			var one = bindTreeMain[i];
			var el = one.treeEl;
			var offsetTop = one.MainElOffsetTop;
			var parent = one.parent;
			//滚动条到改元素的时候
			if((offsetScrollTop>=offsetTop-20)&&(offsetScrollTop<=offsetTop+150)){
				if(currentBindTreeMain){
					CE.removeClass(currentBindTreeMain.treeEl,'nav-active');
					if(currentBindTreeMain.parent){
						CE.removeClass(currentBindTreeMain.parent,'nav-active');
					}
				}

				if(parent){
					CE.addClass(parent,'nav-active');
				}
				CE.addClass(el,'nav-active');
				currentBindTreeMain=one;
			}
		}
	};
});