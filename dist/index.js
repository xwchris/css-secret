(function() {
  // 固定值
  var PAGE_LIST_BOX_SELECTOR = '.container-list';
  var PAGE_NEXT_BUTTON_SELECTOR = '.btn-next';
  var PAGE_PREV_BUTTON_SELECTOR = '.btn-prev';

  var viewWidth = document.documentElement.clientWidth || window.innerWidth;
  var currentPage = 0;
  var $pageListBox = document.querySelector(PAGE_LIST_BOX_SELECTOR);
  var pageList = [].slice.call($pageListBox.children);
  var pageListLength = pageList.length || 0;
  var $nextButton = document.querySelector(PAGE_NEXT_BUTTON_SELECTOR);
  var $prevButton = document.querySelector(PAGE_PREV_BUTTON_SELECTOR);

  // 为每一页设置背景
  pageList.forEach($page => {
    $page.style.backgroundColor = getRandomColor();
  });

  // 绑定事件
  $nextButton.addEventListener('click', showNextPage);
  $prevButton.addEventListener('click', showPrevPage);

  // 初始化
  translateXWithPage(currentPage);

  // 下一页
  function showNextPage() {
    currentPage += 1;
    translateXWithPage(currentPage);
  }

  // 上一页
  function showPrevPage() {
    currentPage -= 1;
    translateXWithPage(currentPage);
  }

  function translateXWithPage(current) {
    $prevButton.style.display = 'block';
    $nextButton.style.display = 'block';

    if (current <= 0) {
      $prevButton.style.display = 'none';
    }
    if (current >= pageListLength - 1) {
      $nextButton.style.display = 'none'
    }

    $pageListBox.style.transform = 'translateX(-' + current * viewWidth  + 'px)';
  }

  // 获取随机颜色
  function getRandomColor() {
    var colors = [];
    var opacity = .6;
    for (var i = 0; i < 3; i++) {
      // rgb范围: 30 ~ 205
      colors.push(Math.floor(Math.random() * 175 + 30));
    }

    return 'rgba(' + colors[0] +',' + colors[1] + ',' + colors[2] + ',' + opacity + ')';
  }
})();
