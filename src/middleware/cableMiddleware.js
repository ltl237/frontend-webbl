import ActionCable from 'actioncable';

export default function cableMiddleware() {
  const cable = ActionCable.createConsumer('/cable');

  return ({ dispatch, getState }) => next => (action) => {
    if (typeof(action) === 'function') {
      return next(action)
    }

    const {
      channel,
      room,
      leave,
    } = action;
    let { received } = action;

    if (!channel) {
      return next(action);
    }

    if (leave) {
      const subscription = cable.subscriptions.subscriptions.find( sub => {
        return sub.identifier === JSON.stringify({ channel, room })
      })
      // const subscription = _.find(
      //   cable.subscriptions.subscriptions,
      //   sub => sub.identifier === JSON.stringify({ channel, room }),
      // );

      return cable.subscriptions.remove(subscription);
    }

    if (typeof(received) === 'string') {
      console.log(received);
      received = result => dispatch({ type: received, result })
    }

    return cable.subscriptions.create({ channel, room }, { received });
  };
}
