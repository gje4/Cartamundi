import {  Style } from '@makeswift/runtime/controls';

import { runtime } from '~/lib/makeswift/runtime';

import { Custom } from './custom';


runtime.registerComponent(Custom, {
  type: 'custom-hero',
  label: 'SharkNinja/Component',
  props: {
    className: Style(),
  },
});