

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as gal from './Galaxy';
import * as environment from './environment';

const env = environment.initEnvironment(true);
environment.initListeners(env);
window.addEventListener('DOMContentLoaded', environment.configureLanguage);

const galaxy = new gal.Galaxy(env);

/**
 * Controls
 */
const controls = new OrbitControls(env.camera, env.canvas);
controls.enabled = true;
controls.enableDamping = true;

/**
 * Animation
 */
const clock = new THREE.Clock();
let previusTime = 0;

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - previusTime;
    previusTime = elapsedTime;

    // env.camera.rotation
    galaxy.points.rotation.y += 0.1 * deltaTime;

    // Render
    controls.update();
    env.renderer.render(env.scene, env.camera);

    window.requestAnimationFrame(tick);
};

tick();
