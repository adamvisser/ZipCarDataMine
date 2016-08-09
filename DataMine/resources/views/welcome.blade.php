<!doctype html>
<html lang="en" ng-app="ziptopia">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ZipTopia: Everyone can Data Mine</title>
  <link href="/css/app.css" rel="stylesheet" type="text/css">
  <link href="/css/semantic.min.css" rel="stylesheet" type="text/css">
  <script src="/js/frameworks.js"></script>
  <script src="/js/app.js"></script>
  
  
</head>
<body>
    
    <div class="ui inverted labeled icon left inline vertical sidebar menu">
        <div class="blue header item">ZipTopia</div>
        <a class="item" href="/#/">
            <i class="home icon"></i>Home
        </a>
    </div>

    <div class="pusher">
        <div id="menu" class="ui centered menu">
            <a class="item">
                <i class="sidebar icon"></i>Menu
            </a>
            <div class="ui right">
              <a class="item" href="http://adamvisser.me" target="_blank"><i class="sidebar icon"></i>More About Adam</a>
            </div>
        </div>
        <div class="ui segment" >
            <div class="ui grid" ng-view>
                
            </div>
        </div>
    </div>
</body>
</html>
