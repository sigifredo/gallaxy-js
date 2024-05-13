

import * as THREE from 'three';
import * as dat from 'lil-gui';

export function configureLanguage() {
    let lang = (navigator.language || navigator.userLanguage).toLowerCase().substring(0, 2);
    console.log(lang);
    let title = document.querySelector('h2.title');

    if (lang === 'es') {
        document.title = 'En construcción - ' + document.title;
        title.textContent = 'Mi página web está en construcción, pero te dejo una galaxia para que juegues con ella.';
    } else {
        document.title = 'Under construction - ' + document.title;
        title.textContent = 'My website is under construction, but I\'ll leave you a galaxy to play with.';
    }
}

export function initEnvironment(debug = false) {
    const env = {
        camera: null,
        canvas: null,
        renderer: null,
        scene: null,
        gui: null
    };
    env.canvas = document.querySelector('canvas.webgl');
    const canvasSize = {
        height: window.innerHeight,
        width: window.innerWidth
    };

    env.scene = new THREE.Scene();

    env.camera = new THREE.PerspectiveCamera(75, canvasSize.width/canvasSize.height);
    env.camera.position.x = 14;
    env.camera.position.y = 6;
    env.camera.position.z = 0;
    env.scene.add(env.camera);

    env.renderer = new THREE.WebGLRenderer({
        canvas: env.canvas,
        alpha: true
    });
    env.renderer.setSize(canvasSize.width, canvasSize.height);
    env.renderer.render(env.scene, env.camera);
    env.renderer.setPixelRatio(Math.sin(window.devicePixelRatio, 2));

    if (debug) {
        env.gui = new dat.GUI();
        const cameraGui = env.gui.addFolder('Camera');
        cameraGui.add(env.camera.position, 'x', -25, 25, 0.25);
        cameraGui.add(env.camera.position, 'y', -25, 25, 0.25);
        cameraGui.add(env.camera.position, 'z', -25, 25, 0.25);
    }

    return env;
}

export function initListeners(env) {
    window.addEventListener('resize', () => {
        env.canvas.height = window.innerHeight;
        env.canvas.width = window.innerWidth;

        env.camera.aspect = env.canvas.width / env.canvas.height;
        env.camera.updateProjectionMatrix();

        env.renderer.setSize(env.canvas.width, env.canvas.height);
        env.renderer.setPixelRatio(Math.sin(window.devicePixelRatio, 2));
    });
    window.addEventListener('dblclick', () => {
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

        if (fullscreenElement) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        } else {
            if (env.canvas.requestFullscreen)
            {
                env.canvas.requestFullscreen();
            }
            else if(env.canvas.webkitRequestFullscreen)
            {
                env.canvas.webkitRequestFullscreen();
            }
        }
    });
}

export default initEnvironment;
