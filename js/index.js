function clearImages() {
	var noImg = document.getElementById("no-image");
	var img = document.getElementById("uploaded-img");
	document.querySelector("#results").innerHTML = '';
	noImg.style.display = "block";
	img.style.display = "none";
}

function initDisplayFunctional() {
	document.querySelector("#clear").addEventListener('click', clearImages);
	document.querySelector("input").addEventListener('click', clearImages);
	document.querySelector('input[type="file"]').addEventListener("change", function () {
		if (this.files && this.files[0]) {
			var img = document.getElementById("uploaded-img");
			var noImg = document.getElementById("no-image");
			img.onload = () => {
				URL.revokeObjectURL(img.src); // if image no longer needed, free memory
			};
			img.src = URL.createObjectURL(this.files[0]);
			img.style.display = "block";
			noImg.style.display = "none";
		}
	});
}

(async function() {
	window.model = await loadModel();
	setTimeout(function(){
		document.querySelector('.loading-indicator').style.display = 'none';
		document.querySelector('main').style.display = 'flex';
		initDisplayFunctional();
	}, 2000);
})();

