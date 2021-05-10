let finalData = [];

function sendInformation() {
  $("#upload-button").attr("disabled", true);
  $(".autocomplete").attr("disabled", true);
  $("#send-icon").hide();
  $(".loader").show();

  axios({
    method: "post",
    url: `${API_HOST}/files`,
    data: {
      msg: $("#autocomplete-input").val(),
      data: finalData,
    },
  })
    .then(({ data }) => {
      M.toast({ html: data.success });
      finalData = [];
      $("#modal2").modal("close");
    })
    .catch((err) => {
      M.toast({ html: "Unknown error, try again later." });
      console.error(err);
    })
    .finally(() => {
      $("#upload-button").removeAttr("disabled");
      $(".autocomplete").removeAttr("disabled");
      $(".loader").hide();
      $("#send-icon").show();
      $(".collection").empty();
    });
}

function hideElements() {
  $("#upload-button").removeAttr("disabled");
  $(".autocomplete").removeAttr("disabled");
  $("#modal1").removeClass("modal-fixed-footer");
  $(".collection").hide();
  $("#modal1").modal("open");
  $(".footer-option").hide();
  $("#file-loading").show();
  $("#send-icon").show();
  $(".loader").hide();
}

function showElements() {
  finalData.forEach((data, index) => {
    if ((data.nome || data.Nome) && (data.telefone || data.Telefone)) {
      $(".collection").html(`
      ${$(".collection").html()}
      <li class="collection-item avatar">
        <i class="material-icons circle green">person</i>
        <span class="title">${data.nome || data.Nome}</span>
        <p>${data.telefone || data.Telefone}
          <br> ${data.endereco || data.Endereco || ""}
        </p>
        <a href="#!" class="secondary-content">
          <i class="material-icons">grade</i>
        </a>
      </li>
      `);
    }
  });

  $("#modal1").addClass("modal-fixed-footer");
  $(".collection").show();
  $(".footer-option").show();
  $("#file-loading").hide();
}

function convertXLSXToJson(file) {
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const data = event.target.result;
      const workBook = XLSX.read(data, {
        type: "binary",
      });
      workBook.SheetNames.forEach((sheet) => {
        finalData.push(
          ...XLSX.utils.sheet_to_row_object_array(workBook.Sheets[sheet])
        );
        finalData.length > 0 && setTimeout(showElements, 2000);
      });
    };
    fileReader.readAsBinaryString(file);
  }
}

function getFile() {
  const fileSelector = document.getElementById("file-input");
  fileSelector.value = "";
  fileSelector.addEventListener("change", (event) => {
    const file = event.target.files[0];

    hideElements();
    convertXLSXToJson(file);
  });
}

$(document).ready(function () {
  $(".modal").modal({
    onCloseStart: () => {
      $(".collection").empty();
    },
  });
  $("#message-form").submit((e) => {
    e.preventDefault();
    finalData.length > 0 && sendInformation();
  });
});
