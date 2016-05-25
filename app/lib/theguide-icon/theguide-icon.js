/**
 * @ngdoc module
 * @name tgIcon
 * @module tgIcon
 */

angular.module('tgIcon', []);
'use strict';

/**
 * @ngdoc directive
 * @name tgIcon
 * @module tgIcon
 * @restrict E
 *
 * @description
 * <p>The <code>tg-icon</code> is a markup element useful for showing an icon based on The Guide icon set or a SVG.</p>
 * <ing-notification type="info" block="true">
 * Support for <code>stacked-icon</code> is not yet available, since this part will be refactored.
 * </ing-notification>
 *
 * @param {String}  font-icon       Name of the icon in <a href="#/component/icon#tgv-components-icon-variations">The Guide font</a>, e.g., <code>holiday</code> or <code>home</code>
 * @param {String}  svg-src         URL to a svg file. <b>Only square SVG files are supported</b>
 * @param {xxs | xs | sm | md | lg | xl | xxl | xxxl | jb | xxj | xxxj | mg | xmg | xxmg}  [size=md]      Choose one from: [xxs, xs, sm, md, lg, xl, xxl, xxxl, jb, xxj, xxxj, mg, xmg, xxmg]
 * @param {String}  [sr-text]         Alternative text which explains the icon. Most of the times you don't want screenreaders to inform you of icons. If you do; provide an alt text.
 *
 * @example
 <example module="tgIcon" deps="theguide-icon/theguide-icon.js">
 <file name="index.html">
    <tg-icon font-icon="house"></tg-icon>
 </file>
 </example>

 * @example
 <h3 class="heading-b-xxl">Base</h3>
 <p> Add <code>sr-text="..."</code> if you want to add semantic meaning to the image.</p>

 <example module="tgIcon" deps="theguide-icon/theguide-icon.js">

 	<file name="index.html">
 		<div>
             <tg-icon font-icon="house"></tg-icon>
             <tg-icon font-icon="addressbook" sr-text="Zoek in het adresboek"></tg-icon>
             <tg-icon svg-src="/docs/theguide-icon/docs/img/lion.svg"></tg-icon>
        </div>
 	</file>

 </example>

 * @example
  <h3 id="tgv-components-icon-variations" class="heading-b-xxl">Variations</h3>
  <p>All the variations of our icons.</p>

   <example module="tgIcon" deps="theguide-icon/theguide-icon.js">
     <file name="index.html">
       <div class="tg-example">
       <div class="form-group">
         <div class="control-label col-xs-4 col-lg-3">
           <label for="iconSize">
             Select iconsize
           </label>
         </div>
         <div class="col-xs-5 col-lg-6">
           <select name="iconSize" id="iconSize" ng-model="iconSize" ng-init="iconSize = 'md'" class="btn btn-default">
             <option>xxs</option>
             <option>xs</option>
             <option>sm</option>
             <option>md</option>
             <option>lg</option>
             <option>xl</option>
             <option>xxl</option>
             <option>xxxl</option>
             <option>jb</option>
             <option>xxj</option>
             <option>xxxj</option>
             <option>mg</option>
             <option>xmg</option>
             <option>xxmg</option>
           </select>
         </div>
       </div>

       <hr/>

       <h4 class="heading-b-sm h-text-b">Illustraties / logos</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="ing-clip"></tg-icon> ing-clip</li>
         <li><tg-icon size="{{iconSize}}" font-icon="ing-logo-lion"></tg-icon> ing-logo-lion</li>
         <li><tg-icon size="{{iconSize}}" font-icon="ing-logo-ing"></tg-icon> ing-logo-ing</li>
         <li><tg-icon size="{{iconSize}}" font-icon="lioninverse"></tg-icon> lioninverse</li>
         <li><tg-icon size="{{iconSize}}" font-icon="loading-image-placeholder"></tg-icon> loading-image-placeholder</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Notificaties</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="notification-error"></tg-icon> notification-error</li>
         <li><tg-icon size="{{iconSize}}" font-icon="notification-information"></tg-icon> notification-information</li>
         <li><tg-icon size="{{iconSize}}" font-icon="notification-interference"></tg-icon> notification-interference</li>
         <li><tg-icon size="{{iconSize}}" font-icon="notification-maintenance"></tg-icon> notification-maintenance</li>
         <li><tg-icon size="{{iconSize}}" font-icon="notification-success"></tg-icon> notification-success</li>
         <li><tg-icon size="{{iconSize}}" font-icon="notification-warning"></tg-icon> notification-warning</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Beleggen</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="risk"></tg-icon> risk</li>
         <li><tg-icon size="{{iconSize}}" font-icon="risk-2"></tg-icon> risk-2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="moon-dashed"></tg-icon> moon-dashed</li>
         <li><tg-icon size="{{iconSize}}" font-icon="erlenmeyer"></tg-icon> erlenmeyer</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-b-up"></tg-icon> arrow-b-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-b-right"></tg-icon> arrow-b-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-b-left"></tg-icon> arrow-b-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-b-down"></tg-icon> arrow-b-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-d-up"></tg-icon> arrow-d-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-d-right"></tg-icon> arrow-d-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-d-left"></tg-icon> arrow-d-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-d-down"></tg-icon> arrow-d-down</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Spaardoelen</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="backpack"></tg-icon> backpack</li>
         <li><tg-icon size="{{iconSize}}" font-icon="bandaid"></tg-icon> bandaid</li>
         <li><tg-icon size="{{iconSize}}" font-icon="bikes"></tg-icon> bikes</li>
         <li><tg-icon size="{{iconSize}}" font-icon="boat-2"></tg-icon> boat-2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="clothes"></tg-icon> clothes</li>
         <li><tg-icon size="{{iconSize}}" font-icon="college"></tg-icon> college</li>
         <li><tg-icon size="{{iconSize}}" font-icon="debt"></tg-icon> debt</li>
         <li><tg-icon size="{{iconSize}}" font-icon="electronics"></tg-icon> electronics</li>
         <li><tg-icon size="{{iconSize}}" font-icon="game"></tg-icon> game</li>
         <li><tg-icon size="{{iconSize}}" font-icon="guitar"></tg-icon> guitar</li>
         <li><tg-icon size="{{iconSize}}" font-icon="holiday"></tg-icon> holiday</li>
         <li><tg-icon size="{{iconSize}}" font-icon="house"></tg-icon> house</li>
         <li><tg-icon size="{{iconSize}}" font-icon="party"></tg-icon> party</li>
         <li><tg-icon size="{{iconSize}}" font-icon="rings"></tg-icon> rings</li>
         <li><tg-icon size="{{iconSize}}" font-icon="washing-machine"></tg-icon> washing-machine</li>
         <li><tg-icon size="{{iconSize}}" font-icon="wealth-increase"></tg-icon> wealth-increase</li>
         <li><tg-icon size="{{iconSize}}" font-icon="car-2"></tg-icon> car-2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="renovation"></tg-icon> renovation</li>
         <li><tg-icon size="{{iconSize}}" font-icon="grandchildren"></tg-icon> grandchildren</li>
         <li><tg-icon size="{{iconSize}}" font-icon="pig-2"></tg-icon> pig-2</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Financieel fit</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="18-birthday"></tg-icon> 18-birthday</li>
         <li><tg-icon size="{{iconSize}}" font-icon="balance"></tg-icon> balance</li>
         <li><tg-icon size="{{iconSize}}" font-icon="boat"></tg-icon> boat</li>
         <li><tg-icon size="{{iconSize}}" font-icon="first-home"></tg-icon> first-home</li>
         <li><tg-icon size="{{iconSize}}" font-icon="graduation"></tg-icon> graduation</li>
         <li><tg-icon size="{{iconSize}}" font-icon="house-2"></tg-icon> house-2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="money-coins"></tg-icon> money-coins</li>
         <li><tg-icon size="{{iconSize}}" font-icon="study"></tg-icon> study</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Social</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="facebook-logo"></tg-icon> facebook-logo</li>
         <li><tg-icon size="{{iconSize}}" font-icon="googleplus-logo"></tg-icon> googleplus-logo</li>
         <li><tg-icon size="{{iconSize}}" font-icon="instagram-logo"></tg-icon> instagram-logo</li>
         <li><tg-icon size="{{iconSize}}" font-icon="instagram-logo-inverted"></tg-icon> instagram-logo-inverted</li>
         <li><tg-icon size="{{iconSize}}" font-icon="linkedin-logo"></tg-icon> linkedin-logo</li>
         <li><tg-icon size="{{iconSize}}" font-icon="twitter-logo"></tg-icon> twitter-logo</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Community</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="community"></tg-icon> community</li>
         <li><tg-icon size="{{iconSize}}" font-icon="community-blog"></tg-icon> community-blog</li>
         <li><tg-icon size="{{iconSize}}" font-icon="community-forum"></tg-icon> community-forum</li>
         <li><tg-icon size="{{iconSize}}" font-icon="community-home"></tg-icon> community-home</li>
         <li><tg-icon size="{{iconSize}}" font-icon="community-people"></tg-icon> community-people</li>
         <li><tg-icon size="{{iconSize}}" font-icon="community-profile"></tg-icon> community-profile</li>
         <li><tg-icon size="{{iconSize}}" font-icon="community-suggestions"></tg-icon> community-suggestions</li>
       </ul>

       <h4 class="heading-b-sm h-text-b">Functioneel (breed in te zetten)</h4>

       <ul class="list-unstyled" ng-class="(iconSize == 'jb' || iconSize == 'xxj' || iconSize == 'xxxj' || iconSize == 'mg' || iconSize == 'xmg' || iconSize == 'xxmg'|| iconSize == 'xxxmg')? 'example-icons-display-flex-large' : 'example-icons-display-flex-small'">
         <li><tg-icon size="{{iconSize}}" font-icon="accessibility"></tg-icon> accessibility</li>
         <li><tg-icon size="{{iconSize}}" font-icon="add"></tg-icon> add</li>
         <li><tg-icon size="{{iconSize}}" font-icon="addressbook"></tg-icon> addressbook</li>
         <li><tg-icon size="{{iconSize}}" font-icon="addressbook-empty"></tg-icon> addressbook-empty</li>
         <li><tg-icon size="{{iconSize}}" font-icon="alarmclock"></tg-icon> alarmclock</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-a-down"></tg-icon> arrow-a-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-a-left"></tg-icon> arrow-a-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-a-right"></tg-icon> arrow-a-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-a-up"></tg-icon> arrow-a-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-c-down"></tg-icon> arrow-c-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-c-left"></tg-icon> arrow-c-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-c-right"></tg-icon> arrow-c-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-c-up"></tg-icon> arrow-c-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-e-down"></tg-icon> arrow-e-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-e-left"></tg-icon> arrow-e-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-e-right"></tg-icon> arrow-e-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-e-up"></tg-icon> arrow-e-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-f-up-right"></tg-icon> arrow-f-up-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-g-down"></tg-icon> arrow-g-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-g-left"></tg-icon> arrow-g-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-g-right"></tg-icon> arrow-g-right</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-g-up"></tg-icon> arrow-g-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-h-down"></tg-icon> arrow-h-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="arrow-h-up"></tg-icon> arrow-h-up</li>
         <li><tg-icon size="{{iconSize}}" font-icon="attachment"></tg-icon> attachment</li>
         <li><tg-icon size="{{iconSize}}" font-icon="box"></tg-icon> box</li>
         <li><tg-icon size="{{iconSize}}" font-icon="calculator"></tg-icon> calculator</li>
         <li><tg-icon size="{{iconSize}}" font-icon="calendar"></tg-icon> calendar</li>
         <li><tg-icon size="{{iconSize}}" font-icon="calendar-2"></tg-icon> calendar-2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="camera"></tg-icon> camera</li>
         <li><tg-icon size="{{iconSize}}" font-icon="car"></tg-icon> car</li>
         <li><tg-icon size="{{iconSize}}" font-icon="chart"></tg-icon> chart</li>
         <li><tg-icon size="{{iconSize}}" font-icon="chat"></tg-icon> chat</li>
         <li><tg-icon size="{{iconSize}}" font-icon="check"></tg-icon> check</li>
         <li><tg-icon size="{{iconSize}}" font-icon="circle-lg"></tg-icon> circle-lg</li>
         <li><tg-icon size="{{iconSize}}" font-icon="desktop"></tg-icon> desktop</li>
         <li><tg-icon size="{{iconSize}}" font-icon="document"></tg-icon> document</li>
         <li><tg-icon size="{{iconSize}}" font-icon="dot-a"></tg-icon> dot-a</li>
         <li><tg-icon size="{{iconSize}}" font-icon="download"></tg-icon> download</li>
         <li><tg-icon size="{{iconSize}}" font-icon="edit"></tg-icon> edit</li>
         <li><tg-icon size="{{iconSize}}" font-icon="email"></tg-icon> email</li>
         <li><tg-icon size="{{iconSize}}" font-icon="eq"></tg-icon> eq</li>
         <li><tg-icon size="{{iconSize}}" font-icon="euro"></tg-icon> euro</li>
         <li><tg-icon size="{{iconSize}}" font-icon="exclamationmark"></tg-icon> exclamationmark</li>
         <li><tg-icon size="{{iconSize}}" font-icon="eye"></tg-icon> eye</li>
         <li><tg-icon size="{{iconSize}}" font-icon="feedback"></tg-icon> feedback</li>
         <li><tg-icon size="{{iconSize}}" font-icon="file"></tg-icon> file</li>
         <li><tg-icon size="{{iconSize}}" font-icon="filter"></tg-icon> filter</li>
         <li><tg-icon size="{{iconSize}}" font-icon="forecast"></tg-icon> forecast</li>
         <li><tg-icon size="{{iconSize}}" font-icon="gender-female"></tg-icon> gender-female</li>
         <li><tg-icon size="{{iconSize}}" font-icon="gender-male"></tg-icon> gender-male</li>
         <li><tg-icon size="{{iconSize}}" font-icon="hammer"></tg-icon> hammer</li>
         <li><tg-icon size="{{iconSize}}" font-icon="home"></tg-icon> home</li>
         <li><tg-icon size="{{iconSize}}" font-icon="information"></tg-icon> information</li>
         <li><tg-icon size="{{iconSize}}" font-icon="information-badge"></tg-icon> information-badge</li>
         <li><tg-icon size="{{iconSize}}" font-icon="label"></tg-icon> label</li>
         <li><tg-icon size="{{iconSize}}" font-icon="like"></tg-icon> like</li>
         <li><tg-icon size="{{iconSize}}" font-icon="location"></tg-icon> location</li>
         <li><tg-icon size="{{iconSize}}" font-icon="lock"></tg-icon> lock</li>
         <li><tg-icon size="{{iconSize}}" font-icon="menu"></tg-icon> menu</li>
         <li><tg-icon size="{{iconSize}}" font-icon="menu2"></tg-icon> menu2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="menu-arrow-open-left"></tg-icon> menu-arrow-open-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="menu-close"></tg-icon> menu-close</li>
         <li><tg-icon size="{{iconSize}}" font-icon="min"></tg-icon> min</li>
         <li><tg-icon size="{{iconSize}}" font-icon="mobile"></tg-icon> mobile</li>
         <li><tg-icon size="{{iconSize}}" font-icon="moneybag"></tg-icon> moneybag</li>
         <li><tg-icon size="{{iconSize}}" font-icon="more"></tg-icon> more</li>
         <li><tg-icon size="{{iconSize}}" font-icon="multiply"></tg-icon> multiply</li>
         <li><tg-icon size="{{iconSize}}" font-icon="my-location"></tg-icon> my-location</li>
         <li><tg-icon size="{{iconSize}}" font-icon="pdf"></tg-icon> pdf</li>
         <li><tg-icon size="{{iconSize}}" font-icon="phone"></tg-icon> phone</li>
         <li><tg-icon size="{{iconSize}}" font-icon="pig"></tg-icon> pig</li>
         <li><tg-icon size="{{iconSize}}" font-icon="play"></tg-icon> play</li>
         <li><tg-icon size="{{iconSize}}" font-icon="plus"></tg-icon> plus</li>
         <li><tg-icon size="{{iconSize}}" font-icon="plus-circle"></tg-icon> plus-circle</li>
         <li><tg-icon size="{{iconSize}}" font-icon="portfolio"></tg-icon> portfolio</li>
         <li><tg-icon size="{{iconSize}}" font-icon="portfolio-open"></tg-icon> portfolio-open</li>
         <li><tg-icon size="{{iconSize}}" font-icon="print"></tg-icon> print</li>
         <li><tg-icon size="{{iconSize}}" font-icon="procent"></tg-icon> procent</li>
         <li><tg-icon size="{{iconSize}}" font-icon="questionmark"></tg-icon> questionmark</li>
         <li><tg-icon size="{{iconSize}}" font-icon="rectangle-rounded"></tg-icon> rectangle-rounded</li>
         <li><tg-icon size="{{iconSize}}" font-icon="refresh"></tg-icon> refresh</li>
         <li><tg-icon size="{{iconSize}}" font-icon="save"></tg-icon> save</li>
         <li><tg-icon size="{{iconSize}}" font-icon="search"></tg-icon> search</li>
         <li><tg-icon size="{{iconSize}}" font-icon="settings"></tg-icon> settings</li>
         <li><tg-icon size="{{iconSize}}" font-icon="shoppingbasket"></tg-icon> shoppingbasket</li>
         <li><tg-icon size="{{iconSize}}" font-icon="star"></tg-icon> star</li>
         <li><tg-icon size="{{iconSize}}" font-icon="star-half"></tg-icon> star-half</li>
         <li><tg-icon size="{{iconSize}}" font-icon="subtract"></tg-icon> subtract</li>
         <li><tg-icon size="{{iconSize}}" font-icon="target"></tg-icon> target</li>
         <li><tg-icon size="{{iconSize}}" font-icon="tip-bulb"></tg-icon> tip-bulb</li>
         <li><tg-icon size="{{iconSize}}" font-icon="trashcan"></tg-icon> trashcan</li>
         <li><tg-icon size="{{iconSize}}" font-icon="up-down"></tg-icon> up-down</li>
         <li><tg-icon size="{{iconSize}}" font-icon="right-left"></tg-icon> right-left</li>
         <li><tg-icon size="{{iconSize}}" font-icon="upload"></tg-icon> upload</li>
         <li><tg-icon size="{{iconSize}}" font-icon="user"></tg-icon> user</li>
         <li><tg-icon size="{{iconSize}}" font-icon="users"></tg-icon> users</li>
         <li><tg-icon size="{{iconSize}}" font-icon="users-2"></tg-icon> users-2</li>
         <li><tg-icon size="{{iconSize}}" font-icon="wrench"></tg-icon> wrench</li>
       </ul>
       </div>
     </file>

   </example>

  * @example
 <h3 class="heading-b-xxl">Sizes</h3>
 <p> Specify a size by adding the attribute <code>size</code>, as listed below:</p>

  <example module="tgIcon" deps="theguide-icon/theguide-icon.js">
    <file name="index.html">
      <div>
        <p>
          <tg-icon font-icon="house" size="xl"></tg-icon>
          <tg-icon font-icon="house" size="jb"></tg-icon>
          <tg-icon font-icon="house" size="xxmg"></tg-icon>
        </p>
        <p>
          <tg-icon svg-src="/docs/theguide-icon/docs/img/lion.svg" size="xl"></tg-icon>
          <tg-icon svg-src="/docs/theguide-icon/docs/img/lion.svg" size="jb"></tg-icon>
          <tg-icon svg-src="/docs/theguide-icon/docs/img/lion.svg" size="xxmg"></tg-icon>
        </p>
      </div>
    </file>

  </example>

 * @example
 <h3 class="heading-b-xxl">Other usages</h3>
 <p> In use with buttons</p>

 <example module="tgIcon" deps="theguide-icon/theguide-icon.js">
 <file name="index.html">
 <div>
   <span>Icon on a button:</span>
   <p>
   <button type="button" class="btn btn-primary">
     <span class="position position-left position-md">
       <tg-icon font-icon="arrow-g-left" size="md" class="position-component position-component-middle"></tg-icon>
        Back to home
     </span>
   </button>
   <button type="button" class="btn btn-default">
       <tg-icon font-icon="house" size="xl" sr-text="Huis"></tg-icon>
     </button>
     <button type="button" class="btn btn-default">
         <tg-icon svg-src="/docs/theguide-icon/docs/img/lion.svg" size="xl" sr-text="Lion"></tg-icon>
     </button>
   </p>
 </div>
 </file>
 </example>

 *
 */
angular.module('tgIcon').directive('tgIcon', [function () {
    var templates = {
        font: {
            hidden:  '<span class="icon icon-{{fontIcon}}" ng-class="iconSize" aria-hidden="true"></span>',
            visible: '<span class="icon icon-{{fontIcon}}" ng-class="iconSize"><span class="sr-only">{{alt}}</span></span>'
        },
        svg: {
            hidden:  '<img ng-src="{{svgSrc}}" ng-class="iconSize" alt class="img-non-rounded"/>',
            visible: '<img ng-src="{{svgSrc}}" ng-class="iconSize" alt="{{alt}}" class="img-non-rounded" />'
        }
    };

    return {
        restrict: 'E',
        scope: {
            fontIcon: '@',
            svgSrc: '@'
        },
        link: function(scope, element, attrs) {
            scope.alt = attrs.srText;

            attrs.$observe('size', function (size) {
                scope.iconSize = 'icon-' + (size || 'md');
            });
        },
        template: function(element, attrs) {
            var visibility = attrs.srText ? 'visible' : 'hidden';
            var type = attrs.fontIcon ? 'font' : 'svg';
            return templates[type][visibility];
        }
    };
}]);


