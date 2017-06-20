angular
  .module('eventApp')
  .controller('EventsIndexCtrl', EventsIndexCtrl)
  .controller('EventsNewCtrl', EventsNewCtrl)
  .controller('EventsShowCtrl', EventsShowCtrl)
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
