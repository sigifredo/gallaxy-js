

import * as THREE from 'three';

export class Galaxy {
    constructor(env) {
        this.env = env;
        this.geometry = null;
        this.material = null;
        this.points = null;
        this.positions = null;
        this.colors = null;

        this.particles = {
            count: 10000,
            size: 0.02,
            radius: 10,
            branches: 3,
            spin: 1,
            randomness: 1,
            randomnessPower: 3,
            insideColor: '#ff6030',
            outsideColor: '#1b3984'
        };

        this.update();

        if (this.env.gui) {
            const galaxy = this.env.gui.addFolder('Galaxy');
            galaxy.add(this.particles, 'count', 100, 100000, 100).onFinishChange(() => this.update());
            galaxy.add(this.particles, 'size', 0.001, 0.1, 0.001).onFinishChange(() => this.update());
            galaxy.add(this.particles, 'radius', 0.01, 20, 0.01).onFinishChange(() => this.update());
            galaxy.add(this.particles, 'branches', 2, 20, 1).onFinishChange(() => this.update());
            galaxy.add(this.particles, 'spin', -5, 5, 0.01).onFinishChange(() => this.update());
            galaxy.add(this.particles, 'randomness', 0, 2, 0.001).onFinishChange(() => this.update());
            galaxy.add(this.particles, 'randomnessPower', 1, 10, 1).onFinishChange(() => this.update());
            galaxy.addColor(this.particles, 'insideColor').onFinishChange(() => this.update());
            galaxy.addColor(this.particles, 'outsideColor').onFinishChange(() => this.update());
        }
    }

    update() {
        if (this.points !== null) {
            this.geometry.dispose();
            this.material.dispose();
            this.env.scene.remove(this.points);
        }

        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(this.particles.count * 3);
        this.colors = new Float32Array(this.particles.count * 3);

        const colorInside = new THREE.Color(this.particles.insideColor);
        const colorOutside = new THREE.Color(this.particles.outsideColor);

        for (let i = 0; i < this.positions.length; i+=3) {
            const radius = Math.random() * this.particles.radius;
            const spinAngle = radius * this.particles.spin;
            const branchAngle = (Math.floor(i / 3) % this.particles.branches) / this.particles.branches * Math.PI * 2;

            const randomX = Math.pow(Math.random(), this.particles.randomnessPower) * (Math.random() < 0.5 ? 1: -1);
            const randomY = Math.pow(Math.random(), this.particles.randomnessPower) * (Math.random() < 0.5 ? 1: -1);
            const randomZ = Math.pow(Math.random(), this.particles.randomnessPower) * (Math.random() < 0.5 ? 1: -1);

            this.positions[i] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            this.positions[i + 1] = randomY;
            this.positions[i + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            // Color
            const mixedColor = colorInside.clone().lerp(colorOutside, radius / this.particles.radius);

            this.colors[i] = mixedColor.r;
            this.colors[i + 1] = mixedColor.g;
            this.colors[i + 2] = mixedColor.b;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

        this.material = new THREE.PointsMaterial({
            size: this.particles.size,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        this.points = new THREE.Points(this.geometry, this.material);
        this.env.scene.add(this.points);
    }
}

export default Galaxy;
