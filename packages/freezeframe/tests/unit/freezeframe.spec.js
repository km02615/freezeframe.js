import Freezeframe from '../../src/index';
import { classes } from '../../src/constants';
import mockCanvas from '../mocks/canvas';

mockCanvas(window);

const testFreezeframeInstance = (imgCount, selector) => {
  const ff = new Freezeframe(selector);
  const $container = document.getElementsByClassName(classes.CONTAINER);
  const $canvas = document.getElementsByClassName(classes.CANVAS);
  const $image = document.getElementsByClassName(classes.IMAGE);
  expect(ff.$images.length).toBe(imgCount);
  expect(ff.items.length).toBe(imgCount);
  expect($container.length).toBe(imgCount);
  expect($canvas.length).toBe(imgCount);
  expect($image.length).toBe(imgCount);
};

describe('default selector', () => {
  test('single image', async () => {
    document.body.innerHTML = `
      <img class="freezeframe" src="foo.gif">
    `;
    testFreezeframeInstance(1);
  });

  test('multiple images', async () => {
    document.body.innerHTML = `
      <img class="freezeframe" src="foo.gif">
      <img class="freezeframe" src="foo.gif">
      <img class="freezeframe" src="foo.gif">
    `;
    testFreezeframeInstance(3);
  });
});

describe('custom string selector', () => {
  test('single image', async () => {
    document.body.innerHTML = `
      <img class="custom" src="foo.gif">
    `;
    testFreezeframeInstance(1, '.custom');
  });

  test('multiple images', async () => {
    document.body.innerHTML = `
      <img class="custom" src="foo.gif">
      <img class="custom" src="foo.gif">
      <img class="custom" src="foo.gif">
    `;
    testFreezeframeInstance(3, '.custom');
  });
});

describe('querySelector, querySelectorAll', () => {
  test('querySelector', async () => {
    document.body.innerHTML = `
      <img class="foo" src="foo.gif">
    `;
    testFreezeframeInstance(1, document.querySelector('.foo'));
  });

  test('querySelectorAll', async () => {
    document.body.innerHTML = `
      <img class="foo" src="foo.gif">
      <img class="foo" src="foo.gif">
      <img class="foo" src="foo.gif">
    `;
    testFreezeframeInstance(3, document.querySelectorAll('.foo'));
  });
});

describe('getElementById, getElementsByClassName, getElementsByTagName', () => {
  test('getElementById', async () => {
    document.body.innerHTML = `
      <img id="foo" src="foo.gif">
    `;
    testFreezeframeInstance(1, document.getElementById('foo'));
  });

  test('getElementsByClassName', async () => {
    document.body.innerHTML = `
      <img class="foo" src="foo.gif">
      <img class="foo" src="foo.gif">
      <img class="foo" src="foo.gif">
    `;
    testFreezeframeInstance(3, document.getElementsByClassName('foo'));
  });

  test('getElementsByTagName', async () => {
    document.body.innerHTML = `
      <img src="foo.gif">
      <img src="foo.gif">
      <img src="foo.gif">
    `;
    testFreezeframeInstance(3, document.getElementsByTagName('img'));
  });
});

describe('parent selector', () => {
  test('single child image', async () => {
    document.body.innerHTML = `
      <div class="freezeframe">
        <img src="foo.gif">
      </div>
    `;
    testFreezeframeInstance(1);
  });

  test('multiple child images', async () => {
    document.body.innerHTML = `
      <div class="freezeframe">
        <img src="foo.gif">
        <img src="foo.gif">
        <img src="foo.gif">
      </div>
    `;
    testFreezeframeInstance(3);
  });

  test('multiple child images with redundancy', async () => {
    document.body.innerHTML = `
      <div class="freezeframe">
        <img src="foo.gif">
        <img src="foo.gif">
        <img class="freezeframe" src="foo.gif">
      </div>
    `;
    testFreezeframeInstance(3);
  });
});
