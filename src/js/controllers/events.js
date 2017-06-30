angular
  .module('eventApp')
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
  .controller('EventsSearchCtrl', EventsSearchCtrl)
  .controller('EventsEditCtrl', EventsEditCtrl);

EventsIndexCtrl.$inject = ['Event'];
function EventsIndexCtrl(Event) {
  const vm = this;

  vm.all = Event.query();


}

EventsNewCtrl.$inject = ['Event', '$state'];
function EventsNewCtrl(Event, $state) {
  const vm = this;
  vm.event = {};

  function eventsCreate() {
    Event
      .save(vm.event)
      .$promise
      .then(() => $state.go('eventsIndex'));
  }

  vm.create = eventsCreate;
}

EventsShowCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsShowCtrl(Event, $stateParams, $state) {
  const vm = this;

  vm.event = Event.get($stateParams);

  function eventsDelete() {
    vm.event
      .$remove()
      .then(() => $state.go('eventsIndex'));
  }

  vm.delete = eventsDelete;
}

EventsSearchCtrl.$inject = ['Event', '$stateParams', '$state', '$http'];
function EventsSearchCtrl(Event, $stateParams, $state, $http) {
  const vm = this;
  vm.lat = 46.76758746952729;
  vm.long = 23.600800037384033;
  vm.data = null;

  function sploosh() {
    console.log('hello');
    $http({
      url: 'http://localhost:7000/api/eventsSearch',
      method: 'GET',
      params: {longitude: vm.long, latitude: vm.lat}
    })
    .then((data)=> {
      vm.data = data.data;
    });
  }
  vm.sploosh = sploosh;

}

EventsEditCtrl.$inject = ['Event', '$stateParams', '$state'];
function EventsEditCtrl(Event, $stateParams, $state) {
  const vm = this;

  vm.event = Event.get($stateParams);

  function eventsUpdate() {
    vm.event
      .$update()
      .then(() => $state.go('eventsShow', $stateParams));
  }

  vm.update = eventsUpdate;
}
