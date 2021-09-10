const templateResult = (bird) => `
		<div class="result-item">
			<img src="./assets/${bird.className}.jpg"><br>
			<b>${bird.className}</b><br>
			<span>(<i>${birds[bird.className].latinName}</i>)</span><br>
			<span>Akurasi: ${` ${parseInt(bird.probability * 100, 10)}%`}</span><br>
			<a href="${birds[bird.className].linkToDesc}">Klik untuk lihat deskripsi</a>
		</div>
	`;

const templateResultLoading = `
	<div></div>
	<div class="loader" id="result-loading"></div>
	<div></div>`;

function displayResult(result) {
	var inner = "";
	result.forEach((bird) => {
		inner += templateResult(bird);
	});
	document.getElementById("results").innerHTML = inner;
}

async function loadModel() {
	var model = await tf.loadLayersModel("./TensorflowJS/model.json");
	return model;
}

async function predict() {
	document.getElementById("results").innerHTML = templateResultLoading;
	let image = document.getElementById("uploaded-img");
	if (image.src != "") {
		let predictions = await model
			.predict(preprocessImage(image))
			.data();
		let results = Array.from(predictions)
			.map(function (p, i) {
				return {
					probability: p,
					className: classes[i],
				};
			})
			.sort(function (a, b) {
				return b.probability - a.probability;
			})
			.slice(0, 3);
		setTimeout(() => {
			document.getElementById("results").innerHTML = "";
			displayResult(results);
		}, 3000);
	}
}

function preprocessImage(image) {
	let tensor = tf.browser.fromPixels(image);
	const resizedImage = tensor.resizeNearestNeighbor([224, 224]);
	const batchedImage = resizedImage.expandDims(0);
	return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}
