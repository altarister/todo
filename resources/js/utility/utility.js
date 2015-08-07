define(['jquery'], function ($){

    var utility = {
        // 단순한 dom 요소 선택을 위한 용도
        uiEnhancements: function (element) {
            var $element = $(this.element || element || document),
                uiObject = this.ui || this;

            // dom 갱신되는 경우에 다시 dom를 탐색하기 위해서 string객체저장
            if(!uiObject.__uiString){
                uiObject.__uiString = $.extend(true, {}, uiObject);
            }

            if(this.ui){ this.element = $element; }
            for (var key in uiObject.__uiString) {
                if (key === "__uiString"){ continue; }
                uiObject[key] = (typeof uiObject.__uiString[key] === "function") ? uiObject.__uiString[key]()
                                                                                 : $element.find(uiObject.__uiString[key]);
            }
        }
    };

    return utility;
});
