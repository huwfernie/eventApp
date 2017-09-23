angular
  .module('eventApp')
  .controller('EventsSearchCtrl', EventsSearchCtrl);

EventsSearchCtrl.$inject = ['Event', '$stateParams', '$state', '$http'];
function EventsSearchCtrl(Event, $stateParams, $state, $http) {
  const vm = this;

  // for inital manualSearch() setup
  vm.lat = 51.566686;
  vm.long = -0.091324;
  vm.limit = 10;
  vm.distance = 500;
  vm.startTime = '0700';
  vm.finishTime = '2300';
  vm.search_results = null;

  // for content Tabs:
  vm.activeTab = null;
  changeTab(1);

  function getLocation(options) {
    // used by nearMeNow
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  function useData(data){
    // used by nearMeNow
    console.log('data');
    vm.long = data.coords.longitude;
    vm.lat = data.coords.latitude;
    return;
  }

  function nearMeNow() {
    // use HTML 5 geo location, then call manualSearch with location result
    getLocation()
      .then((position) => {
        console.log(position);
        useData(position);
        return manualSearch();
      })
      .catch((err) => {
        return console.error(err.message);
      });
  }
  vm.nearMeNow = nearMeNow;

  function manualSearch() {
    // search the database with manual inputs
    console.log('manualSearch');
    $http({
      url: 'http://localhost:7000/api/eventsSearch',
      method: 'GET',
      params: {longitude: vm.long, latitude: vm.lat, limit: vm.limit, distance: vm.distance }
    })
    .then((data)=> {
      vm.search_results = data.data;
    });
  }
  vm.manualSearch = manualSearch;

  function timeSearch() {
    // search the database with manual inputs
    console.log('timeSearch');
    $http({
      url: 'http://localhost:7000/api/eventsSearchTime',
      method: 'GET',
      params: {start: vm.startTime, finish: vm.finishTime }
    })
    .then((data)=> {
      vm.search_results = data.data;
    });
  }
  vm.timeSearch = timeSearch;

  function clearResults() {
    // for clearing search results from display
    console.log('clearResults');
    vm.search_results = null;
  }
  vm.clearResults = clearResults;


  function changeTab(x) {
    // for changing Tab in tabbed browsing
    const allTabs = document.getElementsByClassName('tabs');
    const allContent = document.getElementsByClassName('tab_content');
    if(vm.activeTab !== x) {
      vm.activeTab = x;
      for(let i = 0; i < allTabs.length; i++) {
        allTabs[i].classList.toggle('active');
      }
      for(let i = 0; i < allContent.length; i++) {
        allContent[i].classList.toggle('none');
      }
      // allTabs[x-1].classList.add('active');
    }
  }
  vm.changeTab = changeTab;

  vm.activeSearchButton = [];
  function searchButton(x) {
    console.log(x);
    const gridItems = document.getElementsByClassName('grid_item');
    const searchGrid = document.getElementById('searchGrid');
    if(!vm.activeSearchButton.includes(x)) {
      gridItems[x].classList.toggle('hidden');
      searchGrid.classList.add('visible');
      vm.activeSearchButton.push(x);
    } else {
      gridItems[x].classList.toggle('hidden');
      vm.activeSearchButton.splice(vm.activeSearchButton.indexOf(x),1);
    }

    if(vm.activeSearchButton.length <=0){
      searchGrid.classList.remove('visible');
    }
  }
  vm.searchButton = searchButton;

}
