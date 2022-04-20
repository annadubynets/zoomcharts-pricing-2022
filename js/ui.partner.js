$.widget("ui.partner", {
    options: {
        data: {},
        show_list: false
    },
    last_form: null,
    _create: function() {
        let self = this;
    },
    initPartnerSearch: function() {
        let self = this;
        self.initSearchToggler();

        let $input_query = $("#partner-search-query-input");
        $input_query.on('keyup', function(ev) {
            ev.preventDefault();
            if (ev.key === 'Enter' || ev.keyCode === 13) {
                self.submitSearch();
            }
        });

        let $selector_tag = $("#partner-search-tag-selector");
        $selector_tag.on('change', function(ev) {
            ev.preventDefault();
            self.submitSearch();
        });

        $(".btn-search").on("click", function(ev) {
            ev.preventDefault();
            self.submitSearch();
        });

    },
    submitSearch: function() {
        let self = this;
    
        let $input_query = $("#partner-search-query-input");
        let $selector_tag = $("#partner-search-tag-selector");
        let url = "/en/microsoft-power-bi-custom-visuals/partner-program/find-a-partner/";

        let q = $input_query.val();
        let tag = $selector_tag.val();
        window.location.href = url + "?q=" + q + "&tag=" + tag; 
    },
    initSearchToggler: function() {
        let self = this;
        let $toggles = $(".search-mode-toggler a");
        $toggles.on("click", function(ev) {
            let type = $(this).data("type");
            self.switchTo(type);
            $toggles.removeClass("active");
            $(this).addClass("active");
        });

        let type = "consultant";
        if(window.location.hash == "#reseller") {
            type = "reseller";
        }
        if(self.options.show_list) {
            type = "consultant";

            $([document.documentElement, document.body]).animate({
                scrollTop: $(".consultants-results-section").offset().top - 1700
            }, 200);

        }
        self.switchTo(type);
    },
    switchTo: function(type) {
        let cbs = $(".consultant-block");
        let rbs = $(".reseller-block");
        if(type == "consultant") {
            cbs.show();
            rbs.hide();
        } else {
            cbs.hide();
            rbs.show();
        }
        let $toggles = $(".search-mode-toggler a");
        $toggles.removeClass("active");
        $btn = $(".search-mode-toggler a[data-type='" + type + "']");
        $btn.addClass("active");
    },
    initBecomeResellerForm: function() {
        let self = this;
        $form = $(".reseller-form");
        $form.on("submit", function(ev) {
            ev.preventDefault();
            self.last_form = $(this);
            self._handleSubmitReseller();
        });
    },
    initFindResellerForm: function() {
        let self = this;
        $form = $(".reseller-form");
        $form.on("submit", function(ev) {
            ev.preventDefault();
            self.last_form = $(this);
            self._handleSubmitFindReseller();
        });
    },
    initBecomeConsultancyForm: function() {
        let self = this;
        $form = $(".consultancy-form");
        $form.on("submit", function(ev) {
            ev.preventDefault();
            self.last_form = $(this);
            self._handleSubmitConsultancy();
        });
    },
    initContactPartnerForm: function() {
        let self = this;
        $form = $(".contact-partner-form");
        $form.on("submit", function(ev) {
            ev.preventDefault();
            self.last_form = $(this);
            self._handleSubmitContactPartner();
        });
    },
    initViewPartner: function() {
        let self = this;
        let $d_part2 = $(".description_part2");
        let $btn = $(".read-more-btn");
            
        let collapsed = $(".show-when-collapsed");
        let not_collapsed = $(".show-when-not-collapsed");
        if($btn.hasClass("collapsed")) {
            collapsed.show();
            not_collapsed.hide();
        } else {
            collapsed.hide();
            not_collapsed.show();
        }

        $btn.on("click", function(ev) {
            ev.preventDefault();
            if($(this).hasClass("collapsed")) {
                collapsed.hide();
                not_collapsed.show();
                $(this).removeClass("collapsed");
                $d_part2.show("fast");
            } else {
                collapsed.show();
                not_collapsed.hide();
                $(this).addClass("collapsed");
                $d_part2.hide("fast");
            }
        });
    },
    _handleSubmitReseller: function() {
        let self = this;
        let $form = $(".reseller-form");

        let apply_newsletter = 0;
        let terms_consent = 0;
 
/*
        let $cbx_terms = $("[name='terms']", $form);
        terms_consent = $cbx_terms.prop("checked") ? 1: 0;
        if(!terms_consent) {
            $(this).univ().displayError({msg:"Please agree to the terms and conditions"});
            return;
        }
        
        let $cbx_newsletter = $("[name='newsletter']", $form);
        apply_newsletter = $cbx_newsletter.prop("checked") ? 1: 0;
*/

        var request = {
            accountAction: "becomeReseller",
            first_name: $("[name='first_name']", $form).val(),
            last_name: $("[name='last_name']", $form).val(),
            company: $("[name='company']", $form).val(),
            email: $("[name='email']", $form).val(),
            phone: $("[name='phone']", $form).val(),
            position: $("[name='position']", $form).val(),
            website: $("[name='website']", $form).val(),
            country: $("[name='country']", $form).val(),
            message: $("[name='message']", $form).val(),
            ga_client_id: $("input[name='ga_client_id']", $form).val(),
            terms_consent: terms_consent,
            newsletter_pbi: apply_newsletter
        };
        
        $(this).univ().showLoading();
        $(this).univ().ajaxec("/en/microsoft-power-bi-custom-visuals/partner-program/", request);
        return false;
    },
    _handleSubmitFindReseller: function() {
        let self = this;
        let $form = $(".reseller-form");

        let apply_newsletter = 0;
        let terms_consent = 0;
 
/*
        let $cbx_terms = $("[name='terms']", $form);
        terms_consent = $cbx_terms.prop("checked") ? 1: 0;
        if(!terms_consent) {
            $(this).univ().displayError({msg:"Please agree to the terms and conditions"});
            return;
        }
        
        let $cbx_newsletter = $("[name='newsletter']", $form);
        apply_newsletter = $cbx_newsletter.prop("checked") ? 1: 0;
*/

        var request = {
            accountAction: "findReseller",
            first_name: $("[name='first_name']", $form).val(),
            last_name: $("[name='last_name']", $form).val(),
            email: $("[name='email']", $form).val(),
            phone: $("[name='phone']", $form).val(),
            company: $("[name='company']", $form).val(),
            website: $("[name='website']", $form).val(),
            country: $("[name='country']", $form).val(),
            message: $("[name='message']", $form).val(),
            ga_client_id: $("input[name='ga_client_id']", $form).val(),
            terms_consent: terms_consent,
            newsletter_pbi: apply_newsletter
        };
        
        $(this).univ().showLoading();
        $(this).univ().ajaxec("/en/microsoft-power-bi-custom-visuals/partner-program/", request);
        return false;
    },

    _handleSubmitConsultancy: function() {
        let self = this;
        let $form = $(".consultancy-form");

        let apply_newsletter = 0;
        let terms_consent = 0;
 
/*
        let $cbx_terms = $("[name='terms']", $form);
        terms_consent = $cbx_terms.prop("checked") ? 1: 0;
        if(!terms_consent) {
            $(this).univ().displayError({msg:"Please agree to the terms and conditions"});
            return;
        }
        
        let $cbx_newsletter = $("[name='newsletter']", $form);
        apply_newsletter = $cbx_newsletter.prop("checked") ? 1: 0;
*/

        var request = {
            accountAction: "becomeConsultancy",
            first_name: $("[name='first_name']", $form).val(),
            last_name: $("[name='last_name']", $form).val(),
            company: $("[name='company']", $form).val(),
            email: $("[name='email']", $form).val(),
            position: $("[name='position']", $form).val(),
            website: $("[name='website']", $form).val(),
            country: $("[name='country']", $form).val(),
            ga_client_id: $("input[name='ga_client_id']", $form).val(),
            terms_consent: terms_consent,
            newsletter_pbi: apply_newsletter
        };
        
        $(this).univ().showLoading();
        $(this).univ().ajaxec("/en/microsoft-power-bi-custom-visuals/partner-program/", request);
        return false;
    },
    _handleSubmitContactPartner: function() {
        let self = this;
        let $form = $(".contact-partner-form");

        let apply_newsletter = 0;
        let terms_consent = 0;
 
/*
        let $cbx_terms = $("[name='terms']", $form);
        terms_consent = $cbx_terms.prop("checked") ? 1: 0;
        if(!terms_consent) {
            $(this).univ().displayError({msg:"Please agree to the terms and conditions"});
            return;
        }
        
        let $cbx_newsletter = $("[name='newsletter']", $form);
        apply_newsletter = $cbx_newsletter.prop("checked") ? 1: 0;
*/

        let d = self.options.data;
        let partner_data = {
            "id": d.id,
            "name": d.name,
            "client_id" : d.client_id
        };

        var request = {
            accountAction: "contactPartner",
            first_name: $("[name='first_name']", $form).val(),
            last_name: $("[name='last_name']", $form).val(),
            email: $("[name='email']", $form).val(),
            message: $("[name='message']", $form).val(),
            ga_client_id: $("input[name='ga_client_id']", $form).val(),
            partner: self.options.data.partner,
            terms_consent: terms_consent,
            newsletter_pbi: apply_newsletter,
            partner_data: partner_data
        };
        
        $(this).univ().showLoading();
        $(this).univ().ajaxec("/en/microsoft-power-bi-custom-visuals/partner-program/", request);
        return false;
    },
    cleanForm: function(){
        let self = this;
        if(self.last_form) {
            self.last_form[0].reset();
            if(self.last_form.hasClass("was-validated")) {
                self.last_form.removeClass("was-validated");
            }
        }
    }

});
