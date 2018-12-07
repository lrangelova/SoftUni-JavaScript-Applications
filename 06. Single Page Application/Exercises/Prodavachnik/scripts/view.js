const view = (() => {
  const $loggedInUser = $('#loggedInUser');
  const $linkHome = $('#linkHome');
  const $linkCreateAd = $('#linkCreateAd');
  const $linkLogout = $('#linkLogout');
  const $linkLogin = $('#linkLogin');
  const $linkRegister = $('#linkRegister');
  const $linkListAds = $('#linkListAds');

  const templates = {};

  (async () => {
    const [adsCatalogTemplate, adBoxTemplate] = await Promise.all([
      $.get('./templates/publication/catalog.hbs'),
      $.get('./templates/publication/box-partial.hbs')
    ]);

    templates['catalog'] = Handlebars.compile(adsCatalogTemplate);
    Handlebars.registerPartial('adBox', adBoxTemplate);
  })();

  // Shows only the correct links for a logged in user
  const logged = () => {
    $loggedInUser.text(`Welcome ${localStorage.getItem('username')}`);
    $loggedInUser.show();
    $linkHome.show();
    $linkListAds.show();
    $linkCreateAd.show();
    $linkLogout.show();
    $linkLogin.hide();
    $linkRegister.hide();
  };

  // Shows only the correct links for an anonymous user
  const anonymous = () => {
    $loggedInUser.text('');
    $loggedInUser.hide();
    $linkHome.show();
    $linkListAds.hide();
    $linkCreateAd.hide();
    $linkLogout.hide();
    $linkLogin.show();
    $linkRegister.show();
  };

  const show = (viewName) => {
    // Hide all views and show the selected view only
    $('main > section').hide();
    $('#' + viewName).show();

    if (viewName === 'viewAds') {
      publication.all();
    }
  };

  const navigateTo = () => {
    const target = $(event.currentTarget).attr('data-target');
    show(target);
  };

  return {
    templates,
    logged,
    anonymous,
    navigateTo,
    show,
  };
})();