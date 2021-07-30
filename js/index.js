function initDisplayFunctional() {
	var isMobile =
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		);
	
	if (isMobile) {
		$("#paint").css({ width: "30vw", height: "30vw" });
		$("#canvas").css({ width: "30vw", height: "30vw" });
		$("#uploaded-img").css({ width: "30vw", height: "30vw" });
		$("button").css({ "font-size": "30px" });
	} else {
		$("#paint").css({ width: "224px", height: "280px" });
		$("#canvas").css({ width: "224px", height: "224px" });
		$("#uploaded-img").css({ width: "224px", height: "224px" });
		$("button").css({ "font-size": "22px" });
	}

	$("#clear").click(function () {
		$("#results").html("");
	});
	$("input").click(function () {
		$("#results").html("");
	});
}

async function initPrediction() {
	window.model = await loadModel();
	document.querySelector('input[type="file"]').addEventListener("change", function () {
		if (this.files && this.files[0]) {
			var img = document.getElementById("uploaded-img");
			img.onload = () => {
				URL.revokeObjectURL(img.src); // no longer needed, free memory
			};
			img.src = URL.createObjectURL(this.files[0]);
		}
	});
}

initDisplayFunctional();
initPrediction();
