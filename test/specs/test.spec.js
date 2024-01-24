describe("Test suite", () => {

  beforeEach(async () => {
    await browser.maximizeWindow();
  });

    it("Check page title", async () => {
      await browser.url("https://www.epam.com/");
      const pageTitle = await browser.getTitle();  

      expect(pageTitle).toEqual("EPAM | Software Engineering & Product Development Services");
    })

    it("Check Required fields", async() => {

        const acceptInsecureCertsButton = await $("//button[@id='onetrust-accept-btn-handler']");
        await acceptInsecureCertsButton.waitForDisplayed({timeout:3000});
        await acceptInsecureCertsButton.click();


        const contactUsButton = await $("#wrapper > div.header-container.iparsys.parsys > div.header.section > header > div > div > a.cta-button-ui.cta-button-ui-23.header__control");
        contactUsButton.waitForDisplayed({timeout:3000});
        contactUsButton.click();

        await $("input[name='user_first_name']").setValue("Inna");
        await $("input[name='user_last_name']").setValue("Abramenko");
        await $("//button[text()='Submit']").click();

        const emailError = await $("//label[@for='_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email' and contains(text(), 'Email*')]");

        expect(await emailError.getText()).toEqual("Email*");

    });
    // // it("Check Theme switching", async() => {
    // //     await $("//button[@id='onetrust-accept-btn-handler']").click();
    // //     await $("button.hamburger-menu__button").click();

    // //     const toggleElement = await $("#wrapper > div.header-container.iparsys.parsys > div.header.section > header > div > div > div > div > nav > div > div > div > section > div");

    // //     const initialThemeToggleColor = await toggleElement.getCSSProperty('color');

    // //     toggleElement.click();

    // //     const finalThemeToggleColor = await toggleElement.getCSSProperty('color');

    // //     //console.log(initialThemeToggleColor, finalThemeToggleColor);
        
    // });

    it("Check the policies list", async () => {
        const investorsItem = await $("a[href='/investors']");
        const cokiePolicyItem = await $("a[href='/cookie-policy']");
        const openSourceItem = await $("div.policies a[href='/services/engineering/open-source']");
        const privacyNoticeItem = await $("a[href='/applicant-privacy-notice']");
        const privacyPoliceItem = await $("div.policies a[href='https://privacy.epam.com/core/interaction/showpolicy?type=CommonPrivacyPolicy']");
        const webAccessItem = await $("a[href='/web-accessibility-statement']");


        const policyItems = [investorsItem, cokiePolicyItem, openSourceItem, privacyNoticeItem, privacyPoliceItem, webAccessItem];

        const policyItemsDisplayed = policyItems.map((item) => item.waitForDisplayed({ timeout: 5000 }));
        //const results = await Promise.all(policyItemsDisplayed);
        expect(policyItemsDisplayed.every(result => result)).toEqual(true);

      })
})