import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';

let container;
let time;

// mount a new instance of <App /> for each test
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    ReactDOM.render(<App />, container);
  });
  time = container.querySelector('h2');
});

// destroy app after each test
afterEach(() => { container = null; });


// util func
const sleep = ms => new Promise(cb => setTimeout(cb, ms));

// gets clock value to nearest second
const clock = () => Math.round(Number(time.textContent.substring(0, time.textContent.length - 1)));

// reference to buttons
const btnValue = (i) => container.querySelectorAll('button')[i].textContent;
const clickBtn = (i) => container.querySelectorAll('button')[i]
  .dispatchEvent(new MouseEvent('click', { bubbles: true }));

/* actual tests */

it('starts stopwatch on page load', () => {
  // if the button says 'stop', the timer must be running
  expect(btnValue(0)).toBe('Stop');
});


it('can be stopped; and displays correct time', async () => act(async () => {
  // run timer for 1s, then stop
  await sleep(1000);
  clickBtn(0);
  expect(btnValue(0)).toBe('Resume');
  expect(clock()).toBe(1);
}), 1500);


it('can be resumed; and displays correct time', async () => act(async () => {
  // run timer for 1s, then stop
  await sleep(1000);
  clickBtn(0);
  expect(btnValue(0)).toBe('Resume');
  expect(clock()).toBe(1);

  // resume timer for 1s
  clickBtn(0);
  await sleep(1000);
  clickBtn(0);
  expect(btnValue(0)).toBe('Resume');
  expect(clock()).toBe(2);
}), 2500);


it('can be reset', async () => act(async () => {
  // run timer for 1s, then stop
  await sleep(1000);
  clickBtn(0);
  expect(btnValue(0)).toBe('Resume');
  expect(clock()).toBe(1);

  // reset timer
  clickBtn(1);
  expect(clock()).toBe(0);
}), 1500);
