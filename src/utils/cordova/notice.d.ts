declare namespace cordova.plugins.notification.local {
  /**
   * Check permission to show notifications.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function hasPermission(callback?: Function, scope?: object): void;
  /**
   * Request permission to show notifications.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function requestPermission(callback?: Function, scope?: object): void;
  /**
   * Schedule notifications.
   *
   * @param [ Array ]    notifications The notifications to schedule.
   * @param [ Function ] callback      The function to be exec as the callback.
   * @param [ Object ]   scope         The callback function's scope.
   * @param [ Object ]   args          Optional flags how to schedule.
   * @return [ Void ]
   */
  function schedule(msgs: object, callback?: Function, scope?: object, args?: object): void;
  /**
   * Schedule notifications.
   *
   * @param [ Array ]    notifications The notifications to schedule.
   * @param [ Function ] callback      The function to be exec as the callback.
   * @param [ Object ]   scope         The callback function's scope.
   * @param [ Object ]   args          Optional flags how to schedule.
   * @return [ Void ]
   */
  function update(msgs: object, callback?: Function, scope?: object, args?: object): void;
  /**
   * Clear the specified notifications by id.
   *
   * @param [ Array<Int> ] ids      The IDs of the notifications.
   * @param [ Function ]   callback The function to be exec as the callback.
   * @param [ Object ]     scope    The callback function's scope.
   * @return [ Void ]
   */
  function clear(ids: number[], callback?: Function, scope?: object): void;
  /**
   * Clear all triggered notifications.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function clearAll(callback?: Function, scope?: object): void;
  /**
   * Clear the specified notifications by id.
   *
   * @param [ Array<Int> ] ids      The IDs of the notifications.
   * @param [ Function ]   callback The function to be exec as the callback.
   * @param [ Object ]     scope    The callback function's scope.
   * @return [ Void ]
   */
  function cancel(ids: number[], callback?: Function, scope?: object): void;
  /**
   * Cancel all scheduled notifications.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function cancelAll(callback?: Function, scope?: object): void;
  /**
   * Check if a notification is present.
   *
   * @param [ Int ]      id       The ID of the notification.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function isPresent(id: number, callback?: Function, scope?: object): void;
  /**
   * Check if a notification is scheduled.
   *
   * @param [ Int ]      id       The ID of the notification.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function isScheduled(id: number, callback?: Function, scope?: object): void;
  /**
   * Check if a notification was triggered.
   *
   * @param [ Int ]      id       The ID of the notification.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function isTriggered(id: number, callback?: Function, scope?: object): void;
  /**
   * Check if a notification has a given type.
   *
   * @param [ Int ]      id       The ID of the notification.
   * @param [ String ]   type     The type of the notification.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function hasType(id: number, type: string, callback?: Function, scope?: object): void;
  /**
   * Get the type (triggered, scheduled) for the notification.
   *
   * @param [ Int ]      id       The ID of the notification.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function getType(id: number, callback?: Function, scope?: object): void;
  /**
   * List of all notification ids.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function getIds(callback?: Function, scope?: object): void;
  /**
   * List of all scheduled notification IDs.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function getScheduledIds(callback?: Function, scope?: object): void;
  /**
   * List of all triggered notification IDs.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function getTriggeredIds(callback?: Function, scope?: object): void;
  /**
   * List of local notifications specified by id.
   * If called without IDs, all notification will be returned.
   *
   * @param [ Array<Int> ] ids      The IDs of the notifications.
   * @param [ Function ]   callback The function to be exec as the callback.
   * @param [ Object ]     scope    The callback function's scope.
   * @return [ Void ]
   */
  function get(ids: number[], callback?: Function, scope?: object): void;
  /**
   * List for all notifications.
   *
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function getAll(callback?: Function, scope?: object): void;
  /**
   * List of all scheduled notifications.
   *
   * @param [ Function ]   callback The function to be exec as the callback.
   * @param [ Object ]     scope    The callback function's scope.
   */
  function getScheduled(callback?: Function, scope?: object): void;
  /**
   * List of all triggered notifications.
   *
   * @param [ Function ]   callback The function to be exec as the callback.
   * @param [ Object ]     scope    The callback function's scope.
   */
  function getTriggered(callback?: Function, scope?: object): void;
  /**
   * Add an group of actions by id.
   *
   * @param [ String ]   id       The Id of the group.
   * @param [ Array]     actions  The action config settings.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function addActions(id: string, actions: any[], callback?: Function, scope?: object): void;
  /**
   * Remove an group of actions by id.
   *
   * @param [ String ]   id       The Id of the group.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function removeActions(id: string, callback?: Function, scope?: object): void;
  /**
   * Check if a group of actions is defined.
   *
   * @param [ String ]   id       The Id of the group.
   * @param [ Function ] callback The function to be exec as the callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function hasActions(id: string, callback?: Function, scope?: object): void;
  /**
   * The (platform specific) default settings.
   *
   * @return [ Object ]
   */
  function getDefaults(): object;
  /**
   * Overwrite default settings.
   *
   * @param [ Object ] newDefaults New default values.
   * @return [ Void ]
   */
  function setDefaults(newDefaults: object): void;
  /**
   * Register callback for given event.
   *
   * @param [ String ]   event    The name of the event.
   * @param [ Function ] callback The function to be exec as callback.
   * @param [ Object ]   scope    The callback function's scope.
   * @return [ Void ]
   */
  function on(_event: string, callback?: Function, scope?: object): void;
  /**
   * Unregister callback for given event.
   *
   * @param [ String ]   event    The name of the event.
   * @param [ Function ] callback The function to be exec as callback.
   * @return [ Void ]
   */
  function un(_event: string, callback?: Function): void;
  /**
   * Fire the event with given arguments.
   *
   * @param [ String ] event The event's name.
   * @param [ *Array]  args  The callback's arguments.
   * @return [ Void]
   */
  function fireEvent(_event: string, args?: object): void;
  /**
   * Fire queued events once the device is ready and all listeners are registered.
   *
   * @return [ Void ]
   */
  function fireQueuedEvents(): void;
}
