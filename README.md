# Add Features Branch (Step 2/3)

# TODO:

New components:
Single to-do component
New Features:
Add a new to-do.
Edit to-do item. Such as updating the category.
Swap the order of to-do items.
Get to-do items by category.
Remove a to-do.
Remove all todos from a particular cateogry.

# How we'll do it

Let's start by implemening a component which will display an individual to-do, not just a list of todos.

<SingleTodoPage>

After creating the SingleTodoPage component let's add routing to this component in App.js.

```
    <Route path="/todos/:todoId" element={<SingleTodoPage />} />
```

# Add a to-do

First create a form and then connect the form the Redux store.

```
<Route path="/addTodo" element={<AddTodoForm />} />
```

In todoSlice.js we need to add a reducer function which will handle saving the to-do to our app state.
To save, aka update state, we need the current state and an action object which has the new info. The action object will be dispatched by out AddTodoForm component.

Again the UI our component dispatches an action which updates the app state. That's it.

```
  reducers: {
    createTodo(state, action) {
      state.push(action.payload);
    },
  },
```

We have some things to import to our AddTodoForm component.

```
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { createTodo } from "./todoSlice";
```

The important part is that we dispatch an action which updates the Redux store.

```
  //   update app state by creating a new todo
  const onSaveTodoClicked = () => {
    if (title && notes && category) {
      //   update state
      dispatch(
        createTodo({
          id: nanoid(),
          title: title,
          notes: notes,
          category: category,
        })
      );
      // clear input fields
      setTitle("");
      setNotes("");
      setCategory("");
    }
  };
```

Convince yourself, that this works by visiting dev tools.

# Edit a to-do

<EditPostForm>

When adding a feature need to create a new reducer function. And an action which the componen will then dispatch.

{type: 'posts/postUpdated', payload: {id, title, content}}

By default, the action creators generated by createSlice expect you to pass in one argument, and that value will be put into the action object as action.payload.

Reducer updates state based on the action dispatched to it.

We also know that the reducer is responsible for determining how the state should actually be updated when an action is dispatched.

createSlice creates action creators which UI components can dispatch.

Finally, we'll need to export the action creator function that createSlice generated for us, so that the UI can dispatch the new postUpdated action when the user saves the post.

1. todoSlice.js

```
    updateTodo(state, action) {
      const { id, title, notes, category } = action.payload;
      const todo2Update = state.find((a_todo) => a_todo.id === id);
      if (todo2Update) {
        todo2Update.title = title;
        todo2Update.notes = notes;
        todo2Update.category = category;
      }
    },

    export const { createTodo, updateTodo } = todoSlice.actions;
```

2. EditTodoForm.js

```
//add code
```

3. Update App.js

```
import { EditTodoForm } from "./features/todo/EditTodoForm";
<Route path="editTodo/:todoId" element={EditTodoForm} />
```

4. Update the single to-do component

```
<Link to={`editTodo/${todoId}`} />
```

To edit a post need to retreive right post from Redux store.

Quickly explaint the use of React Router.

# Delete Todo

todoSlice.js

```
    deleteTodo(state, action) {
      const { deleteId } = action.payload;
      return state.filter((a_todo) => a_todo.id !== deleteId);
    },

    ...

    export const { createTodo, updateTodo, deleteTodo } = todoSlice.actions;
```

TodoList.js

```
// add imports
import { useDispatch } from "react-redux";
import { deleteTodo } from "./todoSlice";

....

//dispatch action
  const handleDelete = (deleteId) => {
    dispatch(deleteTodo({ deleteId }));
  };

...

//update UI

      <button onClick={() => handleDelete(a_todo.id)}>Delete</button>

```

# Extra Features ...

Add a timer to a to-do. Change order of todos. Filter/clear category. Color code todos.

Timer

1. timerSlice.js what data will this slice of app state have and what actions will update it.
2. Update store.js to reflect the addition of a timer slice to state.

From the docs:
Redux actions and state should only contain plain JS values like objects, arrays, and primitives. Don't put class instances, functions, or other non-serializable values into Redux!.

3. So let's create a CountDownTimer component. This is a timer feature so in Timer folder.

The CountDownTimer will update the app state via user input. The user can start, pause or delete the timer, so we import these actions from the timerSlice.
Let's start by testing if we can dispatch the startTimer action.

4. Because later we will sort our todos based on time left to complete let's render our countdown timer in TodoList.js.

From the docs:https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads
Components can combine values from props, state, and the Redux store to determine what UI they need to render. They can read multiple pieces of data from the store, and reshape the data as needed for display.

Go to DevTools then the Redux tab and confirm that time/startTimer action was dispatched.

Now that we can succesfully dipsatch a startTimer action. Let actually run our countdown timer, by dispatching and updateTimer action.

For this we will use the javascript function setInterval.

React Hooks, setInterval and Timer Component: https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks

From the docs:https://redux.js.org/tutorials/fundamentals/part-5-ui-react
Fortunately, useSelector automatically subscribes to the Redux store for us! That way, any time an action is dispatched, it will call its selector function again right away. If the value returned by the selector changes from the last time it ran, useSelector will force our component to re-render with the new data.

From the docs:https://redux.js.org/tutorials/essentials/part-4-using-data
Put as little info in action as possibel to describe action.
it's always better to keep the action objects as small as possible, and do the state update calculations in the reducer. This also means that reducers can contain as much logic as necessary to calculate the new state.

Our timer works, but not very useful. Let's make the time remaining a date.

{
id: "456",
duration: 0,
isRunning: false,
dateCreated: "2023-01-09T01:06:58.699Z",
},

TodoList.js

```
import { CountDownTimer } from "../timer/CountDownTimer";

...

<CountDownTimer todoId={a_todo.id} />

```

TimeTodo.js

```
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTime } from './timeSlice';

function Time() {
  const [duration, setDuration] = useState(0); // added this line
  //get time from seperate slice of state
  const time = useSelector(state => state.time.currentTime);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(duration - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [duration]); // added this line

  function handleSetTime(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const newDuration = data.get("duration");
    setDuration(newDuration);
  }

  return (
    <div>
      <p>The countdown timer is at: {duration} seconds</p>
      <form onSubmit={handleSetTime}>
        <label htmlFor="duration">Enter duration in seconds:</label>
        <input id="duration" name="duration" type="number" />
        <button type="submit">Set Time</button>
      </form>
    </div>
  );
}

export default Time;
```

posts/TimeAgo

```
import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
```

# Possible to refactor dispatch

Do this after all features are complete.

Right now our individual components are required to know about all the data to update Redux store.
Can move this logic to todoSlice.js.

https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads
