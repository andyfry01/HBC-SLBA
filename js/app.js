let imgTimer = undefined;

// Router config
const root = null;
const hash = "#!";
const useHash = true;

// Router init
const router = new Navigo(null, useHash, hash);

// Home route definition
router.on({
  "/": () => {
    loadPage("#target", `/pages/home/home.html`, "");

    // only start animations for desktop
    if ($(window).width() > 768) {
      // clear any remaining timers from previous page loads
      window.clearTimeout(imgTimer);
      // Start animation for home page
      sequentiallyToggle(1, 2);
    }
  }
});

router.on({
  "/:folder/:file": function (params) {
    // clear any remaining timers from previous page loads
    window.clearTimeout(imgTimer);
    loadPage(
      "#target",
      `/pages/${params.folder}/${params.file}.html`,
      params.file
    );
  },
  "/etc/404": function (params) {
    // clear any remaining timers from previous page loads
    window.clearTimeout(imgTimer);
    loadPage("#target", "/pages/etc/404.html", params.file);
  },
});

const sentenceCase = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(" ");
};

function loadPage(targetDiv, pageRoute, newTitle) {
  const scrollTop = () => window.scrollTo({ x: 0 });
  const changeTitle = (title) => (document.title = title);
  const setFocus = () => {
    setTimeout(() => {
      const focusTarget = document.getElementById("focus-target");
      focusTarget.setAttribute("tabindex", "-1");
      focusTarget.focus();
      focusTarget.removeAttribute("tabindex");
    }, 0);
  };

  const accessiblePageChange = (title) => {
    const upcaseTitle = sentenceCase(title);
    const nextTitle = `HB&L – ${upcaseTitle}`;

    scrollTop();
    changeTitle(nextTitle);
    setFocus();
  };

  $(targetDiv).empty();
  $(targetDiv).load(pageRoute, (response, status, xhr) => {
    accessiblePageChange(newTitle);
    // checks page HTML to see if this comment is present, which indicates a valid page. If not, redirects to 404 page.
    if (response.toLowerCase().indexOf("<!-- page -->") < 0) {
      router.navigate(`/etc/404`);
    }
  });
}

$(document).ready(function () {
  router.resolve();
});
