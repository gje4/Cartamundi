import {  Style } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { Home } from './home';


runtime.registerComponent(Home, {
  type: 'vibes-ProductCard',
  label: 'Vibes/Products',
  props: {
    className: Style(),
  },
});