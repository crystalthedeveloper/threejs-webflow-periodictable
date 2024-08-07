//threejs-webflow-periodictable/starburstpublic/src/main.js
import * as THREE from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

const table = [
    { symbol: "HT", name: "HTML", row: 1, col: 1 },
    { symbol: "CS", name: "CSS", row: 1, col: 8 },
    { symbol: "JS", name: "JavaScript", row: 2, col: 1 },
    { symbol: "JQ", name: "Jquery", row: 2, col: 2 },
    { symbol: "RE", name: "React", row: 2, col: 3 },
    { symbol: "PY", name: "Python", row: 2, col: 4 },
    { symbol: "MY", name: "MySQL", row: 2, col: 5 },
    { symbol: "PH", name: "PHP", row: 2, col: 6 },
    { symbol: "CG", name: "ChatGPT", row: 2, col: 7 },
    { symbol: "GG", name: "Github & Git", row: 2, col: 8 },
    { symbol: "GT", name: "Google Tag Manager", row: 3, col: 1 },
    { symbol: "AP", name: "API", row: 3, col: 2 },
    { symbol: "GA", name: "Google Analytics", row: 3, col: 3 },
    { symbol: "SE", name: "SEO", row: 3, col: 4 },
    { symbol: "SO", name: "Speed Optimization", row: 3, col: 5 },
    { symbol: "JI", name: "Jira", row: 3, col: 6 },
    { symbol: "AO", name: "AODA", row: 3, col: 7 },
    { symbol: "VS", name: "Visual Studio Code", row: 3, col: 8 },
    { symbol: "BL", name: "Blender 3D", row: 4, col: 1 },
    { symbol: "PS", name: "Photoshop", row: 4, col: 2 },
    { symbol: "FI", name: "Figma", row: 4, col: 3 },
    { symbol: "IL", name: "Illustrator", row: 4, col: 4 },
    { symbol: "XD", name: "Adobe XD", row: 4, col: 5 },
    { symbol: "AE", name: "After Effects", row: 4, col: 6 },
    { symbol: "EX", name: "Adobe Express", row: 4, col: 7 },
    { symbol: "CA", name: "Canva", row: 4, col: 8 },
    { symbol: "UE", name: "Unreal Engine", row: 5, col: 1 },
    { symbol: "GB", name: "GarageBand", row: 5, col: 2 },
    { symbol: "WF", name: "Webflow", row: 5, col: 3 },
    { symbol: "WP", name: "WordPress", row: 5, col: 4 },
    { symbol: "AD", name: "Adobe Experience Manager", row: 5, col: 5 },
    { symbol: "MG", name: "Magnolia", row: 5, col: 6 },
    { symbol: "MC", name: "Mailchimp", row: 5, col: 7 },
    { symbol: "SF", name: "Salesforce", row: 5, col: 8 },
];

const rowCount = Math.max(...table.map(e => e.row));
const colCount = Math.max(...table.map(e => e.col));
const offsetX = colCount * 340 / 2;
const offsetY = rowCount * 380 / 2;

let camera, scene, renderer, controls;
const objects = [];
const targets = { sphere: [] };

init();
animate();

function init() {
    // Initialize camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;

    // Initialize scene
    scene = new THREE.Scene();

    // Create elements and sphere layout
    table.forEach((item, i) => {
        const element = createHTMLElement(item, i);
        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = (item.col * 340) - offsetX;
        objectCSS.position.y = -(item.row * 380) + offsetY;
        scene.add(objectCSS);
        objects.push(objectCSS);

        const sphereObject = createSphereLayout(i, table.length, 1500);
        targets.sphere.push(sphereObject);
    });

    // Initialize renderer
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    // Initialize controls
    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener('change', render);

    // Apply the sphere transformation directly
    transform(targets.sphere, 2000);

    window.addEventListener('resize', onWindowResize);
}

function createHTMLElement(item, index) {
    const element = document.createElement('div');
    element.className = 'element';
    element.style.backgroundColor = `rgba(255, 230, 0, ${(Math.random() * 0.5 + 0.25)})`;

    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = index + 1;
    element.appendChild(number);

    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = item.symbol;
    element.appendChild(symbol);

    const details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = `${item.name}<br>${item.row}, ${item.col}`;
    element.appendChild(details);

    return element;
}

function createSphereLayout(index, total, radius) {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    const sphereObject = new THREE.Object3D();

    sphereObject.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
    );

    return sphereObject;
}

function transform(targets, duration) {
    TWEEN.removeAll();

    objects.forEach((object, i) => {
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    });

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
}

function render() {
    renderer.render(scene, camera);
}