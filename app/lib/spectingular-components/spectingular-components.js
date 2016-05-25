'use strict';

/* global angular */
angular.module('ingComponents.gsaSearchBox', ['ngResource']);

'use strict';

/* Module for injecting all components at once */
angular.module('ingComponents', [
    'ingComponents.email',
    'ingComponents.infoBroker',
    'ingComponents.servicePhone',
    'ingComponents.tan',
    'ingComponents.gsaSearchBox',
    'ingComponents.correspondenceAddress',
    'ingComponents.feedback'
]);

'use strict';

/* global angular */
angular.module('ingComponents.correspondenceAddress', ['ngResource']);

angular.module('ingComponents.correspondenceAddress').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.correspondenceAddress', {
        'FIELD_CorrespondenceAddress': 'Correspondentieadres',
        'BTN_ActionChange': 'Wijzigen',
        'TXT_ActionChange': '(U verlaat dit proces)',
        'MSG_InvalidCorrespondenceAddress': 'Uw correspondentieadres is niet geldig.',
        'MSG_EmptyCorrespondenceAddress': 'Uw correspondentieadres is onbekend.',
        'MSG_ChangeAddress': 'U kunt uw correspondentie adres wijzigen alvorens u verder gaat.',
        'MSG_Tech_ServiceErrorCorrespondenceAddress': 'Uw correspondentieadres kan tijdelijk niet getoond worden.'
    });
}]);

'use strict';

/* global angular */
angular.module('ingComponents.email', ['ngResource']);

angular.module('ingComponents.email').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.email', {
        'BB_CreateEmailAddress_Dialog_Title': 'Uw e-mailadres invullen',
        'FIELD_CONTACTEmailAddress': 'E-mailadres',
        'FIELD_CONTACTEmailAddress_Create': 'Uw e-mailadres',
        'TXT_ExplanationEmailAddress': 'Op dit e-mailadres ontvangt u persoonlijke e-mail van de ING. Bijvoorbeeld de bevestiging van een aangevraagd product.',
        'TXT_ExplanationEmailAddressUnknown': 'Wij hebben geen e-mailadres van u.',
        'TXT_OptionCommercialOffers': 'Ja, ik ontvang op dit e-mailadres ook graag aanbiedingen van de ING.',
        'TXT_ActionChange': 'Wijzigen',
        'TXT_ActionCancel': 'Annuleren',
        'TXT_ActionSave': 'Opslaan',
        'TXT_EmailAddressUnknown': 'Uw e-mailadres doorgeven.',
        'MSG_FuncValSingle_EmailAddressInvalid': 'Vul een geldig e-mailadres in.',
        'MSG_FuncValSingle_MandatoryFieldEmpty': 'Denkt u aan het invullen van dit veld.',
        'MSG_FuncValSingle_EmailAddressMandatory': 'Voordat u verder kunt hebben we uw e-mailadres nodig.',
        'MSG_Func_UpdateEmailAdressSuccessful': 'Uw e-mailadres is gewijzigd.',
        'MSG_Func_CreateEmailAdressSuccessful': 'Bedankt voor het doorgeven van uw e-mailadres.',
        'MSG_Func_EmailAddressNotSaved': 'Klik op ‘Opslaan’ om uw nieuwe e-mailadres te bewaren. Of kies voor ‘annuleren’; u houdt dan uw huidige e-mailadres.',
        'MSG_Func_EmailAddressUndeliverable': 'Wijzig uw e-mailadres. E-mails naar {$emailAddress} komen namelijk niet aan.',
        'MSG_Tech_ServiceErrorUpdateEmailAddress': 'Het is op dit moment helaas niet mogelijk om uw e-mailadres te wijzigen. Onze excuses voor het ongemak. Probeert u het later nog eens.',
        'MSG_Tech_ServiceErrorCreateEmailAddress': 'Het is op dit moment helaas niet mogelijk om uw e-mailadres op te slaan. Onze excuses voor het ongemak. Probeert u het later nog eens.',
        'MSG_Tech_ServiceErrorEmailAddress': 'Het is op dit moment helaas niet mogelijk om uw e-mailadres in te zien. Onze excuses voor het ongemak. Probeert u het later nog eens.'
    });
}]);

'use strict';

/* global angular */
angular.module('ingComponents.feedback', ['ingGlobal', 'ngResource']);

angular.module('ingComponents.feedback').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.feedback', {
        feedback_tooltip_content_rating: 'U geeft uw waardering door te klikken op de sterren.',
        feedback_tooltip_content_explanation: 'Motiveer uw waardering in het toelichtingsvak.',
        feedback_label_rating: 'Waardering',
        feedback_label_explanation: 'Toelichting',
        feedback_error_post_failed: 'Er is iets misgegaan bij het versturen van de feedback. Probeer het later nog eens.',
        feedback_max_characters_suffix: ' tekens invoeren.',
        feedback_max_characters_prefix: 'U kunt nog ',
        feedback_error_no_rating_given: 'Klik op de sterren om uw waardering te geven.',
        feedback_explanation_field_placeholder: 'Toelichting...',
        feedback_button: 'Geef uw mening',
        feedback_thanks_for_feedback: 'Uw feedback is ontvangen. Bedankt voor uw reactie.',
        feedback_title: 'We horen graag uw mening',
        feedback_button_send: 'Verzenden',
        feedback_button_close: 'Afsluiten',
        feedback_button_cancel: 'Annuleren',
        feedback_disclaimer_text: 'Goed om te weten: Uw reactie is anoniem. Daarom kunnen wij deze niet beantwoorden. Wij gebruiken uw reactie uitsluitend ter verbetering van onze online dienstverlening.'
    });
}]);

'use strict';

/* global angular */
angular.module('ingComponents.infoBroker', ['ngResource']);



'use strict';

/* global angular */
angular.module('ingComponents.servicePhone', ['ngResource']);

angular.module('ingComponents.servicePhone').config(['propertyServiceProvider', function (propertyServiceProvider) {
    propertyServiceProvider.add('ingComponents.servicePhone', {
        'BB_CreateServicePhoneNumber_Dialog_Title': 'Uw telefoonnummer invullen',
        'FIELD_CONTACTTelephoneNumber': 'Telefoonnummer',
        'FIELD_CONTACTTelephoneNumber_Create': 'Uw telefoonnummer',
        'TXT_ActionChange': 'Wijzigen',
        'TXT_ActionCancel': 'Annuleren',
        'TXT_ActionSave': 'Opslaan',
        'TXT_CurrentTelephoneNumber': 'Huidig telefoonnummer {$currentPhoneNumberStarred}',
        'TXT_ServicePhoneNumberUnknown': 'Uw telefoonnummer doorgeven.',
        'TXT_OptionCommercialOffersPhoneNumber': 'Benader mij met aanbiedingen en acties.',
        'TXT_ExplanationServicePhoneNumber': 'Op dit nummer kunnen we u bereiken. Bijvoorbeeld bij de verwerking van uw aanvragen of opdrachten. Of om u ergens over te informeren.',
        'TXT_ExplanationServicePhoneNumberUnknown': 'Wij hebben geen telefoonnummer van u.',
        'MSG_FuncValSingle_MandatoryFieldEmpty': 'Denkt u aan het invullen van dit veld.',
        'MSG_FuncValSingle_PhoneNumberInvalid': 'Het opgegeven telefoonnummer is geen geldig telefoonnummer.',
        'MSG_FuncValSingle_ServicePhoneNumberMandatory': 'Voordat u verder kunt hebben we uw telefoonnummer nodig.',
        'MSG_Func_UpdateServicePhoneNumberSuccessful': 'Uw telefoonnummer is gewijzigd.',
        'MSG_Func_CreateServicePhoneNumberSuccessful': 'Bedankt voor het doorgeven van uw telefoonnummer.',
        'MSG_Func_ServicePhoneNumberNotSaved': 'Klik op \'Opslaan\' om uw nieuwe telefoonnummer te bewaren. Of kies voor \'Annuleren\'; u houdt dan uw huidige telefoonnummer.',
        'MSG_Tech_ServiceErrorUpdateServicePhoneNumber': 'Het is op dit moment helaas niet mogelijk om uw telefoonnummer te wijzigen. Onze excuses voor het ongemak. Probeert u het later nog eens.',
        'MSG_Tech_ServiceErrorServicePhoneNumber': 'Het is op dit moment helaas niet mogelijk om uw telefoonnummer in te zien. Onze excuses voor het ongemak. Probeert u het later nog eens.',
        'MSG_Tech_ServiceErrorCreateServicePhoneNumber': 'Het is op dit moment helaas niet mogelijk om uw telefoonnummer op te slaan. Onze excuses voor het ongemak. Probeert u het later nog eens.'
    });
}]);






'use strict';

angular.module('ingComponents.tan', ['ngResource', 'ngSanitize']);

angular.module('ingComponents.tan').config(['propertyServiceProvider', function (propertyServiceProvider) {

    // properties specific for labels and some generic messages.
    propertyServiceProvider.add('ingComponents.tan.labels',
        {
            'FIELD_AUTHChallenge': 'Volgnummer',
            'FIELD_AUTHChallengeResponse': 'TAN-code',
            'BB_AuthorizeByTAN_MandatoryExplanation': 'De TAN-code staat op uw TAN-lijst.',
            'labels_TXT_INGTAN__noTanReceivedTxt': 'Geen TAN-code ontvangen?',
            'labels_TXT_INGTAN_Tan_Code_SMS_Toelichting': 'De TAN-code ontvangt u in een sms-bericht via uw mobiele telefoon. Controleer de opdrachtgegevens in het sms-bericht met de gegevens op het scherm voordat u op verzenden klikt.',
            'labels_TXT_INGTAN_Tancode_Required': 'Vul een TAN-code in, kies daarna Verzenden. ',
            'labels_TXT_INGTAN_Tooltip_Text_SMS': 'Met een TAN-code bevestigt u een (betaal-)opdracht. Deze code ontvangt u in een sms-bericht via uw mobiele telefoon.',
            'labels_TXT_INGTAN_Tooltip_Text_Lijst': 'Met een TAN-code bevestigt u een (betaal-)opdracht. Deze code staat op uw TAN-lijst.',
            'labels_TXT_INGTAN_tan_format_invalid': 'U heeft de TAN-code niet juist ingevuld. De TAN-code dient uit 6 cijfers te bestaan. Vul de TAN-code opnieuw in.',
            'MSG_Func_AuthorizationSuccessfullNewList': '<b>Nieuwe TAN-lijst aangemaakt.</b><br/>Uw voorraad TAN-codes is onder de minimum grens gekomen. U krijgt zo spoedig mogelijk een nieuwe TAN-lijst toegestuurd.',
            'MSG_Tech_Error': 'Sorry, er is iets fout gegaan. Probeert u het later nog een keer. Onze excuses voor het ongemak.',
            'labels_TXT_INGTAN_Tan_Validation_Failed_LIST': '<p>De door u ingevoerde TAN-code is onjuist. Het is belangrijk dat u de TAN-code invult die hoort bij het volgnummer dat u hierboven ziet.</p><p>Goed om te weten<br/>' +
                'Als u 3 keer een onjuiste TAN-code invoert, wordt uw account geblokkeerd. U kunt dan geen geld overmaken via Mijn ING en de Mobiel Bankieren App.</p>',
            'BB_AuthorizeBySMSAlternative_Intro': '<p> <b>Geen TAN-code via uw mobiele telefoon ontvangen</b><br/>' +
                'De ING belt u nu op uw mobiele telefoon. Neem op en zeg eerst zelf iets. U krijgt daarna een keuzemenu te horen. In dit menu kunt u kiezen voor het laten uitspreken van uw TAN-code. ' +
                'Controleer of het volgnummer op uw scherm overeenkomt met de gegevens uit het telefoonbericht. Vul de TAN-code in en klik op \'Verzenden\'. Ontvangt u vaker geen TAN-code via uw mobiele telefoon?' +
                'Neem contact met ons op via 020 22 888 88. Betreft het een zakelijke rekening? Bel dan 020 22 888 22. Bereikbaar op werkdagen van 8.00 uur tot 21.00 uur en op zaterdag van 9.00 uur tot 17.00 uur. Bent u uw mobiele telefoon kwijt waarop u TAN-codes ontvangt?' +
                ' Of wilt u uw mobiele nummer wijzigen? Blokkeer dan eerst uw TAN-functie.<br><br>Vul de TAN-code in en klik op \'Verzenden\'.'
        })
}]);

angular.module('ingComponents.tan').config(['propertyServiceProvider', function (propertyServiceProvider) {
    // properties specific for the errors.
    propertyServiceProvider.add('ingComponents.tan.errors',
            {
                'MSG_Func_NoAUMAId': '<b>Er is iets fout gegaan.</b><br/>U kunt deze opdracht bevestigen met een TAN-code.<br>Heeft u nog nooit een TAN-code ontvangen? Vraag de activeringscode aan om uw TAN-functie te activeren.' +
                    'Ga naar \'Alles in Mijn ING\', dan \'Gegevens en Instellingen\' en vervolgens \'TAN-codes en uw mobiel\'. <br> Binnen 5 werkdagen ontvangt u een activeringscode op uw woonadres.',
                'MSG_Func_BlockedAgreement': '<b>TAN-functie is geblokkeerd</b><br/>Om weer TAN-codes te ontvangen, bel 020 22 888 88. Betreft het een zakelijke rekening? Bel dan 020 22 888 22.<br/><br/>' +
                    'Wij zijn telefonisch bereikbaar op werkdagen van 8.00 tot 21.00 uur op zaterdag van 9.00 tot 17.00 uur.',
                'MSG_Func_InactiveMeans': '<b>Er is iets fout gegaan.</b><br/>Uw TAN-functie is nog niet geactiveerd, daardoor kunt u geen TAN-code invullen.<br>' +
                    'Ga naar \'Alles in Mijn ING\', kies dan \'Gegevens en Instellingen\' vul uw code in bij \'TAN-codes en uw mobiel\'.<br>Dan is uw TAN-functie weer actief.',
                'MSG_Func_MaxNumberOfErrors_Paper': '<b>TAN-functie is geblokkeerd</b><br/>U heeft 3 keer een verkeerde TAN-code ingevoerd. Om veiligheidsredenen is uw TAN-functie geblokkeerd.<br/><br/>' +
                    'U ontvangt binnen 5 werkdagen per post een activeringscode en indien van toepassing een nieuwe TAN-lijst. Met de code activeert u de TAN-functie opnieuw.',
                'MSG_Func_MaxNumberOfErrors_SMS': '<b>TAN-functie is geblokkeerd</b><br/>U heeft 3 keer een verkeerde TAN-code ingevoerd. Om veiligheidsredenen is uw TAN-functie geblokkeerd. U ontvangt ter informatie een sms-bericht op uw mobiele telefoon.<br/><br/>' +
                    'U ontvangt binnen 5 werkdagen per post een activeringscode. Met de code activeert u de TAN-functie opnieuw.',
                'MSG_Tech_Error': 'Sorry, er is iets fout gegaan. Probeert u het later nog een keer. Onze excuses voor het ongemak.',
                'MSG_Func_SuspendedAgreement_P_1': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_2': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_3': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_4': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_5': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_6': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_7': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_8': 'U kunt helaas geen betalingen doen via Mijn ING<br/><br/><b>Wat is de oorzaak?</b><br/>Er kunnen twee oorzaken zijn:' +
                    '<ul><li>de computer die u gebruikt, is mogelijk besmet met een virus. Daardoor kan iemand uw gebruikersnaam en wachtwoord voor Mijn ING achterhalen</li>' +
                    '<li>derden hebben mogelijk uw inloggegevens voor Mijn ING</li></ul><br/><br/><a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/index">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_9': 'Uw TAN-codes zijn voor 12 uur geblokkeerd<br/>Het is helaas niet mogelijk om betalingen te doen via Mijn ING.<br/><br/><b>Wat is de oorzaak?</b><br/><br/>' +
                    'Heeft u een nieuwe mobiele telefoon of SIM-kaart (maar uw nummer blijft gelijk) dan hanteren we een veiligheidsprocedure. Hierdoor ontvangt u 12 uur geen TAN-codes om betalingen te bevestigen in Mijn ING.<br>' +
                    'U krijgt hierover een sms. U hoeft zelf niets te doen. Na 12 uur ontvangt u een sms met de melding dat de TAN-functie is hersteld. U kunt Mijn ING dan weer gebruiken zoals u gewend bent.<br/><br/>' +
                    '<a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/sim-wissel">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_P_10': 'Uw TAN-codes zijn voor 12 uur geblokkeerd<br/>Het is helaas niet mogelijk om betalingen te doen via Mijn ING.<br/><br/><b>Wat is de oorzaak?</b><br/><br/>' +
                    'Heeft u een nieuwe mobiele telefoon of SIM-kaart (maar uw nummer blijft gelijk) dan hanteren we een veiligheidsprocedure. Hierdoor ontvangt u 12 uur geen TAN-codes om betalingen te bevestigen in Mijn ING.<br>' +
                    'U krijgt hierover een sms. U hoeft zelf niets te doen. Na 12 uur ontvangt u een sms met de melding dat de TAN-functie is hersteld. U kunt Mijn ING dan weer gebruiken zoals u gewend bent.<br/><br/>' +
                    '<a href="https://bankieren.mijn.ing.nl/particulier/zelf-regelen/wijzigen/tan-codes/meer-over/tan-functie-geblokkeerd/sim-wissel">Meer informatie</a>',
                'MSG_Func_SuspendedAgreement_Z_1': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_2': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_3': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_4': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_5': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_6': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_7': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_8': '<p>Uw TAN-functie is geblokkeerd</p><p>Om weer TAN-codes te ontvangen, bel ING Zakelijk: 020 22 888 22. Wij helpen u graag op werkdagen van 8.00 tot 21.00 uur en op zaterdag van 9.00 tot 17.00 uur.<br/>' +
                    'U kunt alvast:<br/>- een virusscan doen (<a href="http://www.ing.nl/cleaner">download een gratis programma</a>)<br/>- <a href="https://bankieren.mijnzakelijk.ing.nl/zakelijk/gegevens-en-instellingen/beveiliging/inlogcodes-wijzigen/index">' +
                    'uw gebruikersnaam en wachtwoord aanpassen</a><br/></p>',
                'MSG_Func_SuspendedAgreement_Z_9': '<p>Uw TAN-functie is 12 uur geblokkeerd<br/>Het is helaas niet mogelijk om betalingen te doen via Mijn ING Zakelijk.</p><p>Heeft u een nieuwe mobiele telefoon of SIM-kaart ' +
                    '(maar uw nummer blijft gelijk) dan hanteren we een veiligheidsprocedure. U krijgt hierover een sms en hoeft niets te doen. U ontvangt ook een sms als de TAN-functie is hersteld. Dan kunt u Mijn ING Zakelijk gewoon weer gebruiken.</p>',
                'MSG_Func_SuspendedAgreement_Z_10': '<p>Uw TAN-functie is 12 uur geblokkeerd<br/>Het is helaas niet mogelijk om betalingen te doen via Mijn ING Zakelijk.</p><p>Heeft u een nieuwe mobiele telefoon of SIM-kaart (maar uw nummer blijft gelijk) ' +
                    'dan hanteren we een veiligheidsprocedure. U krijgt hierover een sms en hoeft niets te doen. U ontvangt ook een sms als de TAN-functie is hersteld. Dan kunt u Mijn ING Zakelijk gewoon weer gebruiken.</p>',
                'labels_TXT_INGTAN_Tan_Validation_Failed_SMS': '<p>De door u ingevoerde TAN-code is onjuist. Het is belangrijk dat u de TAN-code invult die hoort bij het volgnummer dat u hierboven ziet.</p><p>Goed om te weten<br/>' +
                    'Het ontvangen van TAN-codes op uw mobiele telefoon wordt geblokkeerd als u 3 keer een onjuiste TAN-code invoert. U kunt dan geen geld overmaken via Mijn ING en de Mobiel Bankieren App.</p>',
                'labels_TXT_INGTAN_Tan_Validation_Failed_LIST': '<p>De door u ingevoerde TAN-code is onjuist. Het is belangrijk dat u de TAN-code invult die hoort bij het volgnummer dat u hierboven ziet.</p><p>Goed om te weten<br/>' +
                    'Als u 3 keer een onjuiste TAN-code invoert, wordt uw account geblokkeerd. U kunt dan geen geld overmaken via Mijn ING en de Mobiel Bankieren App.</p>'
            });
}]);
'use strict';


angular.module('ingComponents.email').directive('ingEmailValidation', function () {

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            var validator = function (value) {
                var pattern = /^(?!.*\.{2})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

                if (!value || value.length === 0 || pattern.test(value)) {
                    // Empty value, or value that matches pattern
                    ctrl.$setValidity('ingEmailValidation', true);
                } else {
                    ctrl.$setValidity('ingEmailValidation', false);
                }
                return value;
            };

            ctrl.$parsers.push(validator);
            ctrl.$formatters.push(validator);
        }
    };
});

'use strict';

/**
 * @name ingGlobal.directive:ing-phone-validation
 * @restrict A
 *
 * @description
 * Directive for validating and formatting a dutch phone number.
 *
 *
 * @example
 <example module="ingGlobal">
 <file name="index.html">
 <form name="form" class="form-horizontal">
 <div ing-validation-group>
 <div ing-control-group>
 <input name="phone" type="ing-number" ing-phone-validator ng-model="model.phone" />
 <div ing-notify on-element="phone">
 <div ing-notification type="error">Not a valid phone number</div>
 </div>
 </div>
 </div>
 </form>
 </file>
 </example>
 */
angular.module('ingComponents.servicePhone').directive('ingPhoneValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attr, ctrl) {
            var validator = function(value) {
                value = $.trim(value);

                var pattern = /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/;

                if (value && pattern.test(value)) {
                    ctrl.$setValidity('ingPhoneValidation', true);
                    return value;
                }
                ctrl.$setValidity('ingPhoneValidation', false);
                return value;
            };

            ctrl.$parsers.push(validator);
            ctrl.$formatters.push(validator);
        }
    };
});

'use strict';

angular.module('ingComponents.tan').directive('ingTanValidate', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        controller: 'ingTanValidateCtrl',
        link: function (scope, element, attrs, ctrl) {
            scope.setInvalid = function () {
                ctrl.$setValidity('ingTanValidate', false);
            };

            // Input KeyMask event handler
            var handleKeyPressEvent = function () {
                ctrl.$setValidity('ingTanValidate', true);

                return true;
            };

            // Bind keymask to keypress event
            element.bind('keypress paste', function () {
                handleKeyPressEvent();
            });
        }
    };
});

angular.module('ingComponents.tan').controller('ingTanValidateCtrl', ['$scope', function ($scope) {
    // listen for invalidation broadcast
    $scope.$on('invalidTan', function () {
        $scope.setInvalid();
    });

}]);

/**
 * @ngdoc directive
 * @name ingComponents.gsaSearchBox.directive:recommendation
 * @restrict EA
 *
 *
 <div recommendation
     data="recommendations"
     header="recommendationsTitle"
     offset="suggestions.length"
     selected-index="selectedIndex"></div>
 */


/**
 * Display a recommended link in the auto suggest drop-down
 * used in partial autoSuggestSearchBox.html
 *
 * params:
 *      recommendations:array with recommendations
 *      header: title displayed above recommendations
 *      offset: number of suggestions preceding the recommendations
 *      selected-index: index of the currently selected suggestion or recommendation
 */
'use strict';

angular.module('ingComponents.gsaSearchBox').directive('ingGsaRecommendation', function(){

    var iconMap = {
        'vraa':'icon-questionmark',
        'broc':'icon-file',
        'vide':'icon-play',
        'prod':'icon-box',
        'pagi':'icon-document'
    };

    return {
        restrict: 'EA',
        replace: true,
        require: '^ingGsaSearchBox',
        scope : {data: '=', offset: '=', header:'=', selectedIndex:'='},
        link: function(scope, element, attrs, ctrl){

            scope.hoverItem = function(i){
                ctrl.setIndex(scope.offset + i);
            };

            scope.iconClass = function(gsaType) {
                var type = gsaType.substr(0,4).toLowerCase();
                return iconMap[type];
            };

        },
        template:

            '<li ng-show="data.length > 0" class="dropdown-menu-item list-group-item l-p-0">' +
                '<div class="title heading-l-xl l-pl-2 l-pr-2 l-mt-1">{{header}}</div>' +
                '<ul class="l-m-0 l-p-0">' +
                    '<li class="dropdown-menu-item list-group-item recommend l-m-0 h-bor-0 l-pl-0" ' +
                    'ng-repeat="tip in data track by $index" ng-mouseover="hoverItem($index)" '+
                    'ng-class="{ \'h-bg-b\': ($index + offset === selectedIndex), \'l-mt-05\':!$first }">' +
                        '<a ng-href="{{tip.url}}">' +
                            '<div class="icon-position icon-before icon-position-xxl l-pl-4">' +
                                '<i class="icon icon-xxl icon-orange h-float-left l-mr-1 {{iconClass(tip.type)}}"></i>' +
                                '<div ng-bind="tip.title | htmlToPlaintext | limitLength:true:55" class="title h-text-b"></div>' +
                                '<div ng-bind="tip.text | htmlToPlaintext | limitLength:true:100" class="text"></div>' +
                            '</div>' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
            '</li>'

    };
});

'use strict';

/**
 * @ngdoc directive
 * @name oSearch.directive:ing-gsa-search-box
 * @restrict EA
 *
 *
 <pre>
 <ing-gsa-search-box></ing-gsa-search-box>
 </pre>
 */


/**
 * Searchbox with button and autosuggest dropdown,
 * auto suggest dropdown contains suggested searches, and suggested search results
 */
angular.module('ingComponents.gsaSearchBox').directive('ingGsaSearchBox', ['$timeout','$document', function($timeout, $document) {
    return {
        restrict: 'EA',
        replace: true,
        controller: 'searchBoxCtrl',
        controllerAs: 'ctrl',
        scope: false,

        link: function(scope, element, attrs, ctrl){

            scope.showDropDown = false;

            var preventClose,
                key = {left: 37, up: 38, right: 39, down: 40 , enter: 13, esc: 27};

            element.bind('keydown',function (e){
                var keycode = e.which || e.keyCode;

                // implementation of the up and down movement in the list of suggestions
                switch (keycode){
                    case key.up:
                        e.preventDefault();
                        ctrl.setIndex(scope.selectedIndex-1);
                        scope.$apply();
                        break;
                    case key.down:
                        e.preventDefault();
                        ctrl.setIndex(scope.selectedIndex+1);
                        scope.$apply();
                        break;
                    case key.right:
                        if (scope.selectedIndex !== -1) {
                            e.preventDefault();
                            ctrl.selectIndex(scope.selectedIndex);
                        }
                        break;
                    case key.enter:
                        e.preventDefault();
                        ctrl.selectIndex(scope.selectedIndex);
                        break;
                    case key.left:
                        if (scope.selectedIndex !== -1) {
                            e.preventDefault();
                            ctrl.clearSuggestions();
                        }
                        break;
                    case key.esc:
                        e.preventDefault();
                        ctrl.clearSuggestions();
                        break;
                    default:
                        // typing in the input field
                        ctrl.setIndex(-1);
                        return;
                }

            });

            // input height needed when drop-down becomes drop-up
            $timeout(function() {
                scope.invokerHeight = element.find('input').outerHeight();
            });

            var documentClick = function () {
                if(preventClose){
                    preventClose = false;
                    return;
                }
                $timeout(function() {
                    ctrl.clearSuggestions();
                }, 200);
            };

            scope.$watch('showDropDown', function(newValue,oldValue){
                if(oldValue!==newValue) {
                    $document[newValue?'bind':'unbind']('click',documentClick);
                }
            });

            scope.elementClick = function () {
                // only prevent close when the dropdown is open
                preventClose = scope.showDropDown;
            };

        },

        template:
            '<div class="input-group">' +
                '<div ng-click="elementClick()">' +
                    '<input type="text" ' +
                        'ng-click="ctrl.inputBoxClick()" ' +
                        'ng-change="ctrl.suggestionsUpdate()" ' +
                        'ng-model="fieldParam" ' +
                        'placeholder="{{ctrl.placeholder}}" ' +
                        'maxlength="128" ' +
                        'class="h-bor-r-0 form-control h-block {{ctrl.inputclass}}"/>' +
                    '<div class="dropdown open h-block h-clear-float">' +
                        '<ul ing-dropdown-positioning ' +
                            'invoker-height="{{invokerHeight}}"' +
                            'class="suggest dropdown-menu h-bor-0 list-group list-group-sm h-text-i h-text-left l-m-0 l-pb-0 l-w-100" ' +
                            'ng-show="showDropDown">' +
                            '<li ng-repeat="suggestion in suggestions track by $index" ' +
                                'ng-if="suggestion" ' +
                                'role="button" ' +
                                'class="dropdown-menu-item list-group-item arial-b-md" ' +
                                'ng-mouseenter="hover = true" ' +
                                'ng-mouseleave="hover = false" ' +
                                'ng-class="{ \'h-bg-b\': (hover || $index === selectedIndex) }">' +
                                '<a index="{{$index}}" ' +
                                    'val="{{suggestion}}" ' +
                                    'ng-click="ctrl.selectIndex($index)">' +
                                    '<div class="h-text-i l-m-0 row l-pl-n2">' +
                                        '<div class="icon-position icon-position-sm col-xxs-1 l-pr-2">' +
                                            '<i class="icon icon-sm icon-search h-text-a h-float-left"></i>' +
                                        '</div>' +
                                        '<div class="col-xxs-9" ng-bind-html="suggestion | highlight:searchParam"></div>' +
                                    '</div>' +
                                '</a>' +
                            '</li>' +
                            '<li ing-gsa-recommendation ' +
                                'ng-if="ctrl.hasRecommendations()" ' +
                                'data="recommendations" ' +
                                'header="ctrl.recommendationsTitle" ' +
                                'offset="suggestions.length" ' +
                                'selected-index="selectedIndex"></li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '<span class="input-group-btn">' +
                    '<button class="btn btn-secondary bold" ng-click="ctrl.doSearch()" type="submit">' +
                        '<i class="icon icon-search icon-md icon-orange"></i>' +
                            ' {{ctrl.buttonText}}' +
                    '</button>' +
                '</span>' +
            '</div>'
    }}]);

angular.module('ingComponents.gsaSearchBox').controller('searchBoxCtrl',
    ['$scope', '$window', '$timeout', 'gsaSuggestionService', 'gsaSearchBoxConfig',
        function($scope, $window, $timeout, suggestionService, gsaSearchBoxConfig) {
            var ctrl = this;

            this.buttonText =  gsaSearchBoxConfig.buttonText;
            this.placeholder = gsaSearchBoxConfig.placeholder.replace('{0}',gsaSearchBoxConfig.domainTitle);
            this.inputclass = gsaSearchBoxConfig.inputclass;
            this.recommendationsTitle = gsaSearchBoxConfig.suggestionsFoundForYou;

            var resultPageUrl = gsaSearchBoxConfig.resultPageUrl || $window.location.pathname,

            // read search parameter from the querystring (?q=text)
                match = $window.location.search.match(/[\?|&]q=([^&]+)/);


            $scope.fieldParam = match ? decodeURIComponent(match[1]):'';

            this.inputBoxClick = function() {
                $scope.searchParam = $scope.fieldParam;
                ctrl.setIndex(-1);
            };

            this.hasRecommendations = function() {
                return ($scope.recommendations && $scope.recommendations.length > 0);
            };

            function hasSuggestions() {
                return ($scope.suggestions.length > 0 || ctrl.hasRecommendations());
            }

            $scope.selectedIndex = -1;
            $scope.suggestions = [];
            $scope.recommendations = [];

            var fetchSuggestions = function(typedthings){

                suggestionService.getTerms(typedthings).then(function(data){
                    $scope.suggestions = data.results.map(function(item) {return(item.name)}).sort();
                    $scope.showDropDown=hasSuggestions();
                });

                suggestionService.getRecommendations(typedthings).then(function(data){
                    $scope.recommendations = data;
                    $scope.showDropDown=hasSuggestions();
                });
            };

            this.doSearch = function() {
                if ($scope.fieldParam) {
                    $window.location.href = resultPageUrl + '?q=' + encodeURIComponent($scope.fieldParam);
                }
            };

            function selectRecommendation(o) {
                $window.location.href = o.url;
            }

            // set new index
            this.setIndex = function(i){
                if(i !== $scope.selectedIndex) {
                    var suggestionCount = $scope.suggestions.length,
                        recommendationCount = $scope.recommendations.length,
                        totalCount = suggestionCount + recommendationCount - 1,
                        newIndex = i < -1 ? totalCount : i > totalCount ? -1 : i,
                        isSuggestion = newIndex > -1 && newIndex < suggestionCount;

                    $scope.selectedIndex = newIndex;
                    $scope.fieldParam = isSuggestion ? $scope.suggestions[newIndex] : $scope.searchParam;
                }
            };

            this.selectIndex = function(index) {
                var selectedRecoIndex = index - $scope.suggestions.length;
                if(selectedRecoIndex > -1) {
                    selectRecommendation($scope.recommendations[selectedRecoIndex]);
                } else {
                    ctrl.setIndex(index);
                    ctrl.doSearch();
                }
            };

            this.clearSuggestions = function() {
                ctrl.setIndex(-1);
                $scope.$apply(function(){
                    $scope.suggestions.length = $scope.recommendations.length = 0;
                });
                $scope.showDropDown=false;
            };

            this.suggestionsUpdate = function() {
                $scope.searchParam = $scope.fieldParam;
                fetchSuggestions($scope.searchParam);
            };


        }]);
'use strict';

/**
 * @ngdoc directive
 * @name ingComponents.correspondenceAddress.directive:ing-correspondence-address-info
 * @restrict EA
 * @element div
 * @function
 * @param {String} url The API URL
 * @param {String} changeUrl The URL where a user can change her address, defaults to /particulier/ik-en-ing/index
 * @param {String} required When true then the form won't be valid when the address could not be retrieved. When the attribute is absent or false the field will never be invalid.
 * @param {String} enableChangeAddress When true a message and link will be shown which takes the client to a screen where the client can change her address information
 * @param {String} description An optional description which will be shown beneath the valid address
 *
 * @description
 * This directive shows the correspondence address of the client. When the client has no correspondence address the residential address will be shown.
 *
 * You cannot access the data directly, but instead you should inject the <strong>infoBrokerService</strong> into your controller/service.
 * The infoBroker enables you to access the data.
 *
 * You need to add the <strong>ingComponents.correspondenceAddress</strong> module into your app dependencies to enable the directive in your app.
 *
 * **Note:** the endpoint of the api is /particulier/ik-en-ing/api/address as default. You can override with parameter: url
 *
 * @example
 * Assuming the infoBrokerService is injected in your service/controller, you can access the data by checking the ingCorrespondenceAddressInfo namespace of the info object.
 * Before getting the data, you should first synchronize the data via the infoBrokerService, which returns a promise.
 * When the promise is resolved, you can safely access the data.
 * <pre>
 *     infoBrokerService.synchronize().then(function (state) {
     *          var addressLines = infoBrokerService.info.ingCorrespondenceAddressInfo.addressLines
     *     }, function(state){
     *          // do something with the state (error of invalid)
     *     })
 * </pre>
 *
 <example>
 <file name="ing-address-info.html">
 <form role="form" class="form-horizontal">
 <div ing-correspondence-address-info
        enable-change-address-link="true"
        required="true"
        description="Dit is uw adres"></div>
 </form>
 </file>
 </example>
 *
 */

/**
 * @ngdoc event
 * @name ingComponents.correspondenceAddress.directive:ing-correspondence-address-info#$destroy
 * @eventOf ingComponents.correspondenceAddress.directive:ing-correspondence-address-info
 * @eventType watch on $scope
 * @description
 * The directive interacts with the outside world via the infoBrokerService. When the directive is removed
 * from the DOM, it is still available in the infoBroker. In general it is good practice to broadcast the $destroy
 * event when the DOM is changed. This directive does the necessary cleanup when broadcast
 */

/**
 * @ngdoc event
 * @name ingComponents.correspondenceAddress.directive:ing-correspondence-address-info#checkValidity
 * @eventOf ingComponents.correspondenceAddress.directive:ing-correspondence-address-info
 * @eventType watch on $scope
 * @description
 * When the directive is part of a form, it automatically listens for checkValidity events that are broadcast
 * for this form.
 *
 */

angular.module('ingComponents.correspondenceAddress')
    .directive('ingCorrespondenceAddressInfo', function () {

            function changeLink() {
                return '<div ng-if="enabledChangeAddress"><a id="addressChangeLink" class="btn btn-default" href="{{changeUrl}}">{{properties.BTN_ActionChange}}</a>' +
                    '<p id="addressChangeLinkDescription" class="l-mb-0">' +
                    '{{properties.TXT_ActionChange}}' +
                    '</p></div>';
            }

            function changeLinkNotification() {
                return '<div ng-if="enabledChangeAddress"  class="h-float-left help-block">' +
                    '<a class="btn btn-default" id="addressChangeLink" href="{{changeUrl}}">{{properties.BTN_ActionChange}}</a>' +
                    '<span id="buttonDescription" class="close-float-right help-block">' +
                    '{{properties.TXT_ActionChange}}' +
                    '</span>' +
                    '</div>';
            }

            var template = {
                loading: '<div ing-form-row label="{{properties.FIELD_CorrespondenceAddress}}">' +
                '<div ing-spinner size="sm" class="form-control-static"></div>' +
                '</div>',

                error: '<div id="correspondenceErrorNotification" ing-form-row label="{{properties.FIELD_CorrespondenceAddress}}">' +
                '<div ing-notification type="{{notificationType}}" ><span id="errorNotification" ng-bind="properties.MSG_Tech_ServiceErrorCorrespondenceAddress"></span></div>' +
                '</div>',

                invalid: '<div id="correspondenceInvalidNotification" ing-form-row label="{{properties.FIELD_CorrespondenceAddress}}">' +
                ' <div ing-notification type="{{notificationType}}">' +
                '  <span class="clearfix">' +
                '    <span id="invalidNotification" ng-bind="properties.MSG_InvalidCorrespondenceAddress"></span>' +
                '    <span ng-if="showChangeMessage" id="changeAddressMessage" ng-bind="properties.MSG_ChangeAddress"></span>' +
                '  </span>' +
                   changeLinkNotification() +
                ' </div>' +
                '</div>',

                show: '<div id="correspondenceAddressShow" ing-form-row label="{{properties.FIELD_CorrespondenceAddress}}" class="form-inline">' +
                ' <div id="showAddressLines">' +
                        '<div class="h-float-left"><div ng-repeat="addressLine in data.addressLines">{{addressLine}}</div></div>' +
                        '<div class="h-float-left l-ml-2">' + changeLink() + '</div>' +
                ' </div>' +
                '</div>' +
                '<div ing-form-row class="form-text-only">' +
                '  <p id="showDescription" ng-if="hasDescription()">{{description}}</p>' +
                '</div>',

                empty: '<div id="correspondenceEmptyNotification" ing-form-row label="{{properties.FIELD_CorrespondenceAddress}}">' +
                ' <div ing-notification type="{{notificationType}}">' +
                '  <span class="clearfix">' +
                '    <span id="emptyNotification" ng-bind="properties.MSG_EmptyCorrespondenceAddress"></span>' +
                '    <span ng-if="showChangeMessage" id="changeAddressMessage" ng-bind="properties.MSG_ChangeAddress"></span>' +
                '  </span>' +
                   changeLinkNotification() +
                ' </div>' +
                '</div>'
            };

            return {
                restrict: 'EA',
                template: '<div ng-form="ingAddressForm">' +
                '<div ng-if="data.state === \'loading\'">' + template.loading + '</div>' +
                '<div ng-if="data.state === \'valid\'">' + template.show + '</div>' +
                '<div ng-if="data.state === \'bouncing\'">' + template.invalid + '</div>' +
                '<div ng-if="data.state === \'invalid\'">' + template.invalid + '</div>' +
                '<div ng-if="data.state === \'404\'">' + template.error + '</div>' +
                '<div ng-if="data.state === \'error\'">' + template.error + '</div>' +
                '<div ng-if="data.state === \'empty\'">' + template.empty + '</div>' +
                '<input type="hidden" id="addressValid" ng-model="data.dummy" name="addressValid" />' +
                '</div>',
                scope: {
                    url: '@',
                    changeUrl: '@',
                    required: '@',
                    enableChangeAddress: '@',
                    description: '@'
                },
                controller: 'correspondenceInfoCtrl',
                link: function postLink(scope, element, attrs, ctrl) {
                    if(!angular.isDefined(attrs.changeUrl)) {
                        //set default changeUrl
                        attrs.changeUrl = '/particulier/ik-en-ing/index'
                    }
                    var destroyListener = scope.$on('$destroy', function () {
                        ctrl.unregister();
                        destroyListener();
                    });
                    ctrl.register();
                    ctrl.getData();
                }

            }
        }
    );

angular.module('ingComponents.correspondenceAddress').controller('correspondenceInfoCtrl', ['$scope', 'correspondenceAddressService', 'propertyService', 'infoBrokerService',
    function ($scope, correspondenceAddressService, propertyService, infoBrokerService) {
        var controller = this;
        var endpoint = $scope.url || '/particulier/ik-en-ing/api/addresses';
        var directiveName = 'ingCorrespondenceAddressInfo';
        $scope.isRequired = angular.isDefined($scope.required) && $scope.required !== 'false';
        $scope.notificationType = $scope.isRequired ? 'error' : 'warning';
        $scope.data = {
            addressLines: [],
            state: 'loading'
        };
        $scope.properties = propertyService.properties('ingComponents.correspondenceAddress');
        $scope.enabledChangeAddress = !angular.isDefined($scope.enableChangeAddress) || $scope.enableChangeAddress === 'true';
        $scope.showChangeMessage = !$scope.isRequired && $scope.enabledChangeAddress;
        controller.getData = function () {
            $scope.data.state = 'loading';
            correspondenceAddressService.get(endpoint, function (result) {
                if (result.state === 'success') {
                    $scope.data.addressLines = stripEmptyAddressLines(result.addressLines);
                    if ($scope.data.addressLines.length === 0) {
                        $scope.data.state = 'empty';
                    } else if (result.validity === 'VALID') {
                        $scope.data.state = 'valid';
                    } else if (result.validity === 'BOUNCING') {
                        $scope.data.state = 'bouncing';
                    } else {
                        $scope.data.state = 'invalid';
                    }
                } else {
                    $scope.data.state = result.state;
                }
            });
        };

        controller.register = function () {

            var dataCopy = {
                data: {
                    state: 'loading',
                    validity: null,
                    addressLines: null
                }
            };

            $scope.$watch('data', function (data) {
                dataCopy.data.validity = data.state;
                dataCopy.data.addressLines = data.addressLines;

                var isInvalid = ($scope.data.state !== 'valid' && $scope.isRequired);

                dataCopy.data.state = $scope.data.formValid === false || isInvalid ? 'invalid' : ( $scope.data.state === 'loading' ? $scope.data.state : 'valid' );

            }, true);

            infoBrokerService.register(directiveName, dataCopy.data, controller.synchronize);
        };

        controller.unregister = function () {
            infoBrokerService.unregister(directiveName);
        };

        controller.synchronize = function () {
            $scope.$broadcast('checkValidity');
        };

        $scope.hasDescription = function() {
            return $scope.description !== undefined;
        };

        $scope.$on('checkValidity', function () {
            if ($scope.data.state !== 'valid' && $scope.isRequired) {
                $scope.ingAddressForm.addressValid.$setValidity('addressValid', false);
            }
            $scope.data.formValid = $scope.ingAddressForm.$valid;
        });

        function stripEmptyAddressLines(addressLines){
            for(var i = 0; i < addressLines.length;){
                if(addressLines[i] === null || addressLines[i].trim() === ''){
                    addressLines.splice(i, 1);
                }
                else{
                    //this one is here for when an item gets removed everything moves 1 forward/backwards so there would be no need to up the increment
                    i++;
                }
            }
            return addressLines;
        }

    }
]);

/**
 * @ngdoc directive
 * @name ingComponents.email.directive:ing-email-info
 * @restrict EA
 * @element div
 * @function
 * @param {String} url The API URL
 *
 * @description
 * This directive shows the email address of the client and a link to change it inline. If no email address can be found, it shows an input field instead.
 *
 * You cannot access the data directly, but instead you should inject the <strong>infoBrokerService</strong> into your controller/service.
 * The infoBroker enables you to access the data and send the data to the server when in edit mode (via its synchronize function).
 *
 * You need to add the <strong>ingComponents.email</strong> module into your app dependencies to enable the directive in your app.
 *
 * **Note:** the endpoint of the api is /particulier/ik-en-ing/api/email as default. You can override with parameter: url
 * This means that this directive can only be used for 'particulier' clients!
 *
 * @example
 * Assuming the infoBrokerService is injected in your service/controller, you can access the data by checking the ingEmailInfo namespace of the info object.
 * Before getting the data, you should first synchronize the data via the infoBrokerService, which returns a promise.
 * When the promise is resolved, you can safely access the data.
 * <pre>
 *     infoBrokerService.synchronize().then(function (state) {
     *          var emailAddress = infoBrokerService.info.ingEmailInfo.emailAddress
     *     }, function(state){
     *          // do something with the state (error of invalid)
     *     })
 * </pre>
 *
 <example>
 <file name="ing-email-info.html">
 <form role="form" class="form-horizontal">
     <div ing-email-info url="http://ing.nl"></div>
 </form>
 </file>
 </example>
 *
 */

/**
 * @ngdoc event
 * @name ingComponents.email.directive:ing-email-info#$destroy
 * @eventOf ingComponents.email.directive:ing-email-info
 * @eventType watch on $scope
 * @description
 * The directive interacts with the outside world via the infoBrokerService. When the directive is removed
 * from the DOM, it is still available in the infoBroker. In general it is good practice to broadcast the $destroy
 * event when the DOM is changed. This directive does the necessary cleanup when broadcast
 */

/**
 * @ngdoc event
 * @name ingComponents.email.directive:ing-email-info#checkValidity
 * @eventOf ingComponents.email.directive:ing-email-info
 * @eventType watch on $scope
 * @description
 * When the directive is part of a form, it automatically listens for checkValidity events that are broadcast
 * for this form.
 *
 */

'use strict';

/* Directive for changing email inline */

angular.module('ingComponents.email').directive('ingEmailInfo', ['$compile', 'propertyService', function () {
    var template = {
        loading: '<div ing-form-row label="{{emailMessages.FIELD_CONTACTEmailAddress}}">' +
                    '<div ing-spinner ng-show="true" size="sm" class="form-control-static"></div>' +
                '</div>',

        edit: '<div>' +
                '<div ing-validation-group name="ingEmailInfo">' +
                    '<div ing-form-row label="{{emailMessages.FIELD_CONTACTEmailAddress}}" for="emailInput">' +
                        '<div ng-if="origValues.emailAddress">' +
                            '<div class="row">' +
                                '<div class="col-lg-9">' +
                                    '<div class="input-group">' +
                                        '<input ng-disabled="data.updating" type="text" class="form-control" ng-model="newValues.newEmailAddress" id="emailInput" name="emailInput" maxlength="100" ing-required ing-email-validation/>' +
                                        '<span class="input-group-btn">' +
                                            '<button type="button" class="btn btn-primary" id="saveEmailAddress" ng-click="save()" >{{emailMessages.TXT_ActionSave}}</button>' +
                                        '</span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-3">' +
                                    '<button type="button" id="emailCancelLink" class="btn btn-secondary" ng-click="cancel()">{{emailMessages.TXT_ActionCancel}}</button>' +
                                '</div>' +
                            '</div>' +
                            '<div id="email-explanation" class="help-block">{{emailMessages.TXT_ExplanationEmailAddress}}</div>' +
                            '<div>' +
                                '<div ing-notify on-element="emailInput" validate="ingRequired">' +
                                    '<div ing-notification type="error"><span id="errorNotification" ng-bind="emailMessages.MSG_FuncValSingle_MandatoryFieldEmpty"></span></div>' +
                                '</div>' +
                                '<div ing-notify on-element="emailInput" validate="ingEmailValidation">' +
                                    '<div ing-notification type="error"><span id="errorNotification" ng-bind="emailMessages.MSG_FuncValSingle_EmailAddressInvalid"></span></div>' +
                                '</div>' +
                                '<div ing-notify on-element="emailInput" validate="notSaved">' +
                                    '<div ing-notification type="error"><span id="errorNotification" ng-bind="emailMessages.MSG_Func_EmailAddressNotSaved"></span></div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>',

        error: '<div id="emailErrorNotification" ing-form-row label="{{emailMessages.FIELD_CONTACTEmailAddress}}">' +
                    '<div ing-notification type="error" ><span id="errorNotification" ng-bind="emailMessages.MSG_Tech_ServiceErrorEmailAddress"></span></div>' +
                    '<input type="hidden" id="emailValid" ng-model="data.dummy" name="emailValid" />' +
                '</div>',

        show: '<div ing-form-row label="{{emailMessages.FIELD_CONTACTEmailAddress}}" class="form-inline">' +
                    '<div><p class="form-control-static" id="showEmail">{{data.emailAddress}}</p> <button type="button" class="btn btn-default" id="emailChangeLink" ng-click="edit()">{{emailMessages.TXT_ActionChange}}</button></div>' +
                    '<div ng-if="successNotificationEmailChanged.message != null" ing-notification type="{{successNotificationEmailChanged.type}}"><span id="succesNotification" ng-bind="successNotificationEmailChanged.message"></span></div>' +
                    '<div ng-if="errorState === \'save\'" ing-notification type="error"><span id="errorNotification" ng-bind="emailMessages.MSG_Tech_ServiceErrorUpdateEmailAddress"></span></div>' +
                    '<div ng-if="data.emailValid === false" ing-notification type="{{emailAddressUnderliverableNotification.type}}"><span id="undeliverableNotification" ng-bind="emailAddressUnderliverableNotification.message"></span></div>' +
                    '<input type="hidden" id="emailValid" ng-model="data.dummy" name="emailValid" />' +
                '</div>',

        empty: '<div>' +
                    '<div ing-validation-group name="ingEmailInfo">' +
                        '<div ing-form-row label="{{emailMessages.FIELD_CONTACTEmailAddress}}">' +
                            '<div>' +
                                '<button type="button" class="btn btn-default" id="enterNewEmailAddress" ing-modal partial="partials/ingEmail.html" size="md" title="{{emailMessages.BB_CreateEmailAddress_Dialog_Title}}">{{emailMessages.TXT_EmailAddressUnknown}}</button>' +
                            '</div>' +
                            '<div class="help-block" id="unknownEmailAddress">{{emailMessages.TXT_ExplanationEmailAddressUnknown}}</div>' +
                            '<input type="hidden" id="emailEmpty" ng-model="data.dummy" name="emailEmpty" />' +
                            '<div ing-notify on-element="emailEmpty" validate="emailEmpty">' +
                                '<div ing-notification type="error"><span id="errorNotification" ng-bind="emailMessages.MSG_FuncValSingle_EmailAddressMandatory"></span></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'

    };
    return {
        template: '<div ng-form="ingEmailForm">' +
                    '<div ng-if="data.state === \'loading\'">' + template.loading + '</div>' +
                    '<div ng-if="data.state === \'valid\' || (data.state === \'error\' && errorState === \'save\')">' + template.show + '</div>' +
                    '<div ng-if="data.state === \'edit\' || data.state === \'invalid\'">' + template.edit + '</div>' +
                    '<div ng-if="data.state === \'empty\'">' + template.empty + '</div>' +
                    '<div ng-if="data.state === \'error\' && errorState !== \'save\'">' + template.error + '</div>' +
                '</div>' +
                '<script type="text/ng-template" id="partials/ingEmail.html">' +
                    '<div><div ing-email-new url="{{url}}"></div></div>' +
                '</script>',
        restrict: 'EA',
        scope: {
            url: '@url',
            required: '@required'
        },
        controller: 'ingEmailInfoCtrl',
        link: function postLink(scope, element, attrs, ctrl) {
            var destroyListener = scope.$on('$destroy', function () {
                ctrl.unregister();
                destroyListener.call();
            });
            ctrl.register();
        }
    };
}]);

angular.module('ingComponents.email').controller('ingEmailInfoCtrl', ['$scope', 'infoBrokerService','emailInfoService', 'propertyService', function ($scope, infoBrokerService, emailInfoService, propertyService) {
    var controller = this;

    $scope.origValues = {};
    $scope.successNotificationEmailChanged = {};
    $scope.newValues = {
            newEmailAddress: null
        };

    $scope.emailMessages = propertyService.properties('ingComponents.email');

    var endpoint = $scope.url || '/particulier/ik-en-ing/api/email';
    $scope.isRequired = $scope.required === 'false' ? false : true;

    $scope.data = {
        emailAddress: null,
        allowCommercialOffers: null,
        state: 'loading',
        emailValid: true,
        formValid: true
    };

    $scope.edit = function () {
        $scope.data.state = 'edit';
        $scope.successNotificationEmailChanged = {};
        $scope.newValues.newEmailAddress = $scope.origValues.emailAddress;
    };

    $scope.cancel = function () {
        $scope.newValues.newEmailAddress = null;
        $scope.data.state = 'valid';
        $scope.errorState = '';
        $scope.data.formValid = true;
    };

    $scope.save = function () {
        $scope.ingEmailForm.ingEmailInfo.emailInput.$setValidity('notSaved', true);
        controller.validate();
        $scope.errorState = '';
    };

    $scope.emailAddressUnderliverableNotification = {
        message:  $scope.emailMessages.MSG_Func_EmailAddressUndeliverable.replace('{$emailAddress}', $scope.data.emailAddress),
        type: 'WARNING'
    };

    controller.getData = function (initial) {

        $scope.data.state = 'loading';
        $scope.errorState = '';

        emailInfoService.get(endpoint, function (result) {

            if (result.state !== 'error') {

                if (!initial) {
                    if ($scope.origValues.emailAddress && $scope.origValues.emailAddress !== result.emailAddress) {
                        $scope.successNotificationEmailChanged.type = 'SUCCESS';
                        $scope.successNotificationEmailChanged.message = $scope.emailMessages.MSG_Func_UpdateEmailAdressSuccessful;
                    } else if (!$scope.origValues.emailAddress && result.emailAddress) {
                        $scope.successNotificationEmailChanged.type ='SUCCESS';
                        $scope.successNotificationEmailChanged.message = $scope.emailMessages.MSG_Func_CreateEmailAdressSuccessful;
                    }
                }

                $scope.data.emailAddress = result.emailAddress;
                $scope.data.allowCommercialOffers = result.allowCommercialOffers;
                $scope.data.state = result.state;
                $scope.data.emailValid = result.emailValid;
                $scope.origValues.emailAddress = result.emailAddress;
                $scope.emailAddressUnderliverableNotification.message = $scope.emailMessages.MSG_Func_EmailAddressUndeliverable.replace('{$emailAddress}', $scope.data.emailAddress);

            } else {

                $scope.data.state = 'error';
                $scope.errorState = 'get';

            }

        });
    };

    controller.saveData = function () {

        $scope.$broadcast('checkValidity');

        if ($scope.data.state === 'edit') {

            controller.validate();
        } else if ($scope.data.state === 'valid') {
            // only when the new emailAddress is different from the one we already have, we will save it
            if ($scope.newValues.newEmailAddress !== $scope.origValues.emailAddress) {

                $scope.data.state = 'loading';

                $scope.data.emailAddress = $scope.newValues.newEmailAddress;

                var postData = {
                    emailAddress: $scope.data.emailAddress,
                    allowCommercialOffers: $scope.data.allowCommercialOffers
                };

                emailInfoService.save( endpoint, postData, function (result) {

                    if (result.state === 'valid') {
                        controller.getData();
                    } else {
                        $scope.data.state = 'error';
                        $scope.errorState = 'save';
                        $scope.data.emailAddress = $scope.origValues.emailAddress;
                    }

                });

            }
        }
    };

    controller.register = function () {

        var dataCopy = {
            data: {
                emailAddress: null,
                allowCommercialOffers: null,
                state: 'loading',
                emailValid: false
            }
        };

        $scope.$watch('data', function (data) {
            dataCopy.data.emailAddress = data.emailAddress;
            dataCopy.data.allowCommercialOffers = data.allowCommercialOffers;
            dataCopy.data.emailValid = data.emailValid;

            var isInvalid = (($scope.data.state === 'valid' || $scope.data.state === 'error') && $scope.data.emailValid === false) || ($scope.data.state === 'empty' && $scope.isRequired) || ($scope.data.state === 'error' && $scope.errorState === 'get' && $scope.isRequired) || $scope.data.state === 'edit' || $scope.data.state === 'invalid';

            dataCopy.data.state = $scope.data.formValid === false || isInvalid ? 'invalid' : ( $scope.data.state === 'loading' ? $scope.data.state : 'valid' );

        }, true);

        infoBrokerService.register('ingEmailInfo', dataCopy.data, controller.synchronize);
    };

    controller.unregister = function () {
        infoBrokerService.unregister('ingEmailInfo');
    };

    controller.validate = function () {
        $scope.data.state = $scope.ingEmailForm.$valid === true ? 'valid' : 'invalid';
        controller.saveData();
    };

    controller.synchronize = function () {
        $scope.$broadcast('checkValidity');
    };

    $scope.$on('checkValidity', function () {
        if ($scope.data.state === 'invalid' && $scope.ingEmailForm.$valid === true) {
            $scope.data.state = 'edit';
        }
        if ($scope.data.state === 'edit' && $scope.ingEmailForm.ingEmailInfo.emailInput.$invalid === false) {
            $scope.ingEmailForm.ingEmailInfo.emailInput.$setValidity('notSaved', false);
        }
        if ($scope.data.state === 'empty' && $scope.isRequired) {
            $scope.ingEmailForm.ingEmailInfo.emailEmpty.$setValidity('emailEmpty', false);
        }
        if ((($scope.data.state === 'valid' || $scope.data.state === 'error') && $scope.data.emailValid === false && $scope.ingEmailForm.emailValid)) {
            $scope.ingEmailForm.emailValid.$setValidity('emailValid', false);
        }
        if ($scope.data.state === 'error' && $scope.errorState === 'get' && $scope.isRequired && $scope.ingEmailForm.emailValid) {
            $scope.ingEmailForm.emailValid.$setValidity('emailValid', false);
        }

        $scope.data.formValid = $scope.ingEmailForm.$valid;

    });

    $scope.$on('emailAddressSaved', function(event) {
        event.stopPropagation();
        controller.getData();
        $scope.data.formValid = true;
    });

    controller.getData(true);

}]);

angular.module('ingComponents.email').directive('ingEmailNew', ['$compile', 'propertyService', function () {
    return {
        template:
            '<div class="panel panel-a panel-bordered panel-shadow-a">' +
                '<div ng-show="data.state == loading" class="h-text-center">' +
                    '<div class="panel-heading">' +
                        '<h3 class="panel-title panel-title-primary">Even geduld a.u.b.</h3>' +
                    '</div>' +
                    '<div class="panel-body l-pt-1 l-pb-2">' +
                        '<div ing-spinner size="lg"></div>' +
                    '</div>' +
                '</div>' +
                '<div ng-show="data.state != loading">'+
                    '<div class="panel-heading" id="newEmailHeading">' +
                        '<h3 class="panel-title panel-title-primary">{{emailMessages.BB_CreateEmailAddress_Dialog_Title}}</h3>'+
                    '</div>' +
                    '<div class="panel-body">' +
                        '<form class="form-horizontal" name="addNewEmailForm" ng-submit="submit()" ing-form-grid label-width="4" field-width="8">' +
                            '<div ng-if="data.state === \'error\'">' +
                                '<div ing-notification type="error"><span ng-bind="emailMessages.MSG_Tech_ServiceErrorCreateEmailAddress"></span></div>' +
                            '</div>' +
                            '<div ing-validation-group id="emailValidationGroup" >' +
                                '<div ing-form-row for="emailAddress" id="newEmailAdressLabel" label="{{emailMessages.FIELD_CONTACTEmailAddress_Create}}">' +
                                    '<div class="row">' +
                                        '<div class="col-lg-11">' +
                                            '<input type="text" class="form-control" name="emailAddress" id="emailAddress" ng-model="newValues.newEmailAddress" ing-required ing-email-validation />' +
                                        '</div>' +
                                    '</div>' +
                                    '<div ing-notify on-element="emailAddress" validate="ingRequired">' +
                                        '<div ing-notification type="error"><span ng-bind="emailMessages.MSG_FuncValSingle_MandatoryFieldEmpty"></span></div>' +
                                    '</div>' +
                                    '<div ing-notify on-element="emailAddress" validate="ingEmailValidation">' +
                                        '<div ing-notification type="error"><span ng-bind="emailMessages.MSG_FuncValSingle_EmailAddressInvalid"></span></div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<div ing-validation-group>' +
                                '<div ing-form-row class="l-mt-n1 l-mb-3">' +
                                    '<div class="row">' +
                                        '<div class="col-lg-11">' +
                                            '<div class="help-block" id="email-explanation" ng-bind="emailMessages.TXT_ExplanationEmailAddress"></div>' +
                                            '<label class="checkbox" id="emailOffersCheckbox">' +
                                                '<input type="checkbox" name="allowCommercialOffers" ng-model="data.allowCommercialOffers"/> {{emailMessages.TXT_OptionCommercialOffers}}' +
                                            '</label>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +

                            '<fieldset>' +
                                '<div class="form-group btn-bar">' +
                                    '<legend class="sr-only"></legend>' +
                                    '<div ing-form-grid-label>' +
                                        '<button ng-click="close()" id="emailcancelLink" class="btn btn-secondary" type="button">{{emailMessages.TXT_ActionCancel}}</button>' +
                                    '</div>' +
                                    '<div ing-form-grid-field>' +
                                        '<button id="emailSaveButton" type="submit" class="btn btn-primary">{{emailMessages.TXT_ActionSave}}</button>' +
                                    '</div>' +
                                '</div>' +
                            '</fieldset>' +
                        '</form>' +
                    '</div>' +
                '</div>' +
            '</div>' ,
        link: function(scope, element) {
            scope.addNewEmailFormCtrl = element.find('[name="addNewEmailForm"]').scope().addNewEmailForm;
        },
        restrict: 'EA',
        scope: {
            url: '@url'
        },
        controller: 'ingEmailNewCtrl'
    };
}]);

angular.module('ingComponents.email').controller('ingEmailNewCtrl', ['$scope', '$timeout', 'propertyService', 'infoBrokerService','emailInfoService', function ($scope, $timeout, propertyService, infoBrokerService, emailInfoService) {

    var controller = this;
    var endpoint = $scope.url || '/particulier/ik-en-ing/api/email';

    $scope.emailMessages = propertyService.properties('ingComponents.email');
    $scope.newValues = {
        newEmailAddress: null
    };

    $scope.data = {
        allowCommercialOffers: true,
        state: 'edit',
        emailAddress: null
    };

    $scope.submit = function() {

        $scope.$broadcast('checkValidity');

        if ($scope.addNewEmailFormCtrl.$valid) {
            controller.saveData();
        }

    };

    controller.saveData = function() {

        $scope.data.state = 'loading';

        $scope.data.emailAddress = $scope.newValues.newEmailAddress;

        var postData = {
            emailAddress: $scope.data.emailAddress,
            allowCommercialOffers: $scope.data.allowCommercialOffers
        };

        emailInfoService.save( endpoint, postData, function (result) {

            if (result.state === 'valid') {
                $scope.close();
                $timeout( function() {
                    $scope.$emit('emailAddressSaved');
                });
            } else {
                $scope.data.state = 'error';
            }

        });

    };

    $scope.close = function() {
        $scope.$emit('modal-close');
    };

}]);

/* Feedback button directive */
'use strict';

/***
 * @ngdoc directive
 * @name ingComponents.feedback.directive:ing-feedback-button
 * @restrict EA
 *
 * @scope
 * @param {integer}        [rating=undefined]         floating point value between 1 and 5 (or undefined)
 * @param {string}         [opinion='']               string with a max length of 2000 characters which will be used to prefill the text area
 * @param {string}         [type='popup']             the type of form to display, either 'inline' or 'popup'
 * @param {array}          labels                     An array of labels (a-z/A-Z only) wich are attached to the feedback when it is submitted to the API
 * @param {function}       onFeedbackSent             A callback to a function to be called when the feedback is sent succesfully. It will be called with one parameter, an object containing the sent data
 *
 * @description
 * This directive wraps the <a href="#/spectingular/ingComponents.feedback.directive:ing-feedback-button">ing-feedback-form</a> directive. It initially only displays a button, clicking it will open the feedback form.
 * This can be done either inline, or in a modal popup. After sucessfully submitting feedback, the form and the button will disappear.
 *
 * To override the default texts, use the propertyService. (See app/js/ingFeedbackComponent.js in the spectingular-components repo for a list of messages)
 *
 * @example
 <example module="ingComponents.feedback">
 <file name="feedback-button-basic.html">
 <div ng-controller="Ctrl">
 <ing-feedback-button type="popup" labels="labels">
 </ing-feedback-button>
 </div>
 </file>
 <file name="feedback-button-basic-example-controller.js">
 function Ctrl($scope) {
            $scope.labels = ['testmessage', 'mingz'];
        }
 </file>
 </example>
 */
angular.module('ingComponents.feedback').directive('ingFeedbackButton', ['propertyService', function () {

    return {
        restrict: 'EA',
        scope: {
            opinion: '@',
            rating: '@',
            type: '@',
            labels: '=',
            onFeedbackSent: '='
        },
        controller: 'FeedbackButtonController',
        template:
        '<div>' +
        '    <div aria-hidden="{{modalOpen}}">' +
        '       <button id="feedback-button-modal" type="button" ng-show="!alreadySent && type===\'popup\'" ing-modal partial="modal_feedback.html" class="btn btn-primary" size="lg" ng-click="openModal()" aria-controls="feedback-modal-form">{{messages.feedback_button}}</button>' +
        '       <button id="feedback-button-inline" type="button" ng-if="!alreadySent && !inlineVisible && type===\'inline\'" ng-click="openInline()" class="btn btn-primary" size="lg" aria-controls="feedback-inline-form">{{messages.feedback_button}}</button>' +
        '       <div ng-if="alreadySent && !modalOpen" ><p id="id-feedback-thanks-message" ng-bind="messages.feedback_thanks_for_feedback"/></div>' +
        '   </div>' +
        '   <div id="feedback-inline-form" ng-if="inlineVisible" ing-feedback-form labels="labels" opinion="{{opinion}}" rating="{{rating}}" on-feedback-sent="handleFeedbackSent" role="region" aria-live="polite"></div>' +
        '   <script type="text/ng-template" id="modal_feedback.html">' +
        '       <div id="feedback-modal-form" ing-feedback-form labels="labels" opinion="{{opinion}}" rating="{{rating}}" on-feedback-sent="handleFeedbackSent" role="region" aria-live="polite"/>' +
        '   </script>' +
        '</div>',
        link: function (scope, element, attrs) {
            if (angular.isUndefined(attrs.type)) {
                attrs.type = 'popup';
            }
        }
    }
}]);

angular.module('ingComponents.feedback').controller('FeedbackButtonController', ['$scope', 'propertyService', function ($scope, propertyService) {

    $scope.messages = propertyService.properties('ingComponents.feedback');
    $scope.inlineVisible = false;
    $scope.alreadySent = false;
    $scope.modalOpen = false;

    $scope.openInline = function () {
        $scope.inlineVisible = true;
    };

    $scope.openModal = function () {
        $scope.modalOpen = true;
    };

    $scope.handleFeedbackSent = function (data) {
        $scope.alreadySent = true;
        $scope.inlineVisible = false;
        if (angular.isFunction($scope.onFeedbackSent)) {
            $scope.onFeedbackSent(data);
        }
    };

    $scope.$on('modal-closed', function () {
        $scope.modalOpen = false;
    });

}]);

'use strict';
/* Feedback form directive */

/***
 * @ngdoc directive
 * @name ingComponents.feedback.directive:ing-feedback-form
 * @restrict EA
 *
 * @scope
 * @param {integer}  [rating=undefined]         floating point value between 1 and 5 (or undefined)
 * @param {string}   [opinion='']               string with a max length of 2000 characters which will be used to prefill the text area
 * @param {array}    labels                     An array of labels (a-z/A-Z only) wich are attached to the feedback when it is submitted to the API
 * @param {function} onFeedbackSent             A callback to a function to be called when the feedback is sent succesfully. It will be called with one parameter, an object containing the sent data
 *
 * @description
 * This directive will display an inline form which can be used to submit feedback to the feedback Next API.
 * It consists of an ing-starrating element, a text input and a submit button. Clicking this button will post the input to the feedback Next API, after which a thanks message is shown.
 * To override the default texts, use the propertyService. (See ingFeedbackComponent.js for a list of messages)
 * To show the form in a popup or hide it initially, See <a href="#/spectingular/ingComponents.feedback.directive:ing-feedback-button">ing-feedback-button</a>
 *
 * @example
 <example module="ingComponents.feedback">
 <file name="feedback-form-basic.html">
 <div ng-controller="Ctrl">
 <ing-feedback-form labels="labels" on-feedback-sent="handleSentFeedback">
 </ing-feedback-form>
 </div>
 </file>
 <file name="feedback-form-basic-example-controller.js">
 function Ctrl($scope) {
            $scope.labels = ['testmessage', 'mingz'];

            $scope.handleSentFeedback = function(data) {
                // data object will contain text, rating, labels and type (always 'RATING')
            }
        }
 </file>
 </example>
 */
angular.module('ingComponents.feedback').directive('ingFeedbackForm', function () {
    return {
        restrict: 'EA',
        scope: {
            opinion: '@',
            rating: '@',
            labels: '=',
            onFeedbackSent: '='
        },
        controller: 'FeedbackFormController',
        template: '<div class=\"panel panel-a\">' +
        '    <div class=\"panel-heading\">' +
        '        <h3 class=\"panel-title panel-title-primary\"><span tabindex="1" ng-bind=\"messages.feedback_title\"/></h3>' +
        '    </div>' +
        '    <div class=\"panel-body h-bg-a\" ng-show=\"!feedbackSent\">' +
        '        <form name=\"feedbackForm\" ng-submit=\"sendFeedbackForm()\">' +
        '            <div ing-validation-group=\"\" class=\"form-group l-pl-1 l-pr-1\">' +
        '                <label for=\"id-stars\">{{messages.feedback_label_rating}}' +
        '                   <span ing-info-popover=\"\" config=\"tooltipConfigRating\"></span>' +
        '                </label>' +
        '                <div id=\"id-stars\" icon-size=\"lg\" ing-starrating ng-model=\"data.rating\" name=\"rating\" ing-required></div>' +
        '                <div id=\"id-stars-error\" ing-notify=\"\" on-element=\"rating\" validate=\"ingRequired\">' +
        '                    <p ing-notification=\"\" type=\"error\">{{messages.feedback_error_no_rating_given}}</p>' +
        '                </div>' +
        '            </div>' +
        '            <div ing-validation-group=\"\" class=\"form-group l-pl-1 l-pr-1\">' +
        '                <label for=\"id-explanation-field\">{{messages.feedback_label_explanation}}' +
        '                   <span ing-info-popover=\"\" config=\"tooltipConfigExplanation\"></span>' +
        '                </label>' +
        '                <textarea class=\"form-control\" id=\"id-explanation-field\" name=\"explanation-field\"' +
        '                          placeholder={{messages.feedback_explanation_field_placeholder}}' +
        '                          ng-model=\"data.opinion\" maxlength=\"2000\" ng-maxlength=\"2000\">' +
        '                </textarea>' +
        '                <p class=\"h-text-right help-block small\" id=\"id-remaining-characters\">' +
        '                    {{messages.feedback_max_characters_prefix}}{{2000 -' +
        '                    data.opinion.length}}{{messages.feedback_max_characters_suffix}}' +
        '                </p>' +
        '            </div>' +
        '            <p ng-if=\"messages.feedback_disclaimer_text\" ing-notification=\"\" block=\"false\" type=\"info\">{{messages.feedback_disclaimer_text}}</p>' +
        '            <br>' +
        '            <div>' +
        '            <input type=\"submit\" id=\"id-submit-feedback\" value=\"{{messages.feedback_button_send}}\"' +
        '                   class=\"btn btn-primary\"/>' +
        '            </div>' +
        '            <div id=\"id-http-error\" ng-show=\"sendFailed\"><br/>' +
        '                <p ing-notification type=\"error\">{{messages.feedback_error_post_failed}}</p>' +
        '            </div>' +
        '        </form>' +
        '    </div>' +
        '    <p id=\"id-thanks-for-feedback\" ng-show=\"feedbackSent\" class=\"panel-body\" ng-bind="messages.feedback_thanks_for_feedback" />' +
        '</div>'
    }
});

angular.module('ingComponents.feedback').controller('FeedbackFormController', ['$rootScope', '$scope', '$http', '$location', 'propertyService', 'ingFeedbackService', function ($rootScope, $scope, $http, $location, propertyService, ingFeedbackService) {

    $scope.feedbackForm = {};
    $scope.messages = propertyService.properties('ingComponents.feedback');

    var rating = parseInt($scope.rating);
    if(isNaN(rating) || rating < 1 || rating > 5) {
        rating = undefined;
    }
    $scope.data = {opinion: $scope.opinion, rating: rating};

    $scope.feedbackSent = false;

    $scope.sendFailed = false;

    $scope.tooltipConfigRating = {
        text: $scope.messages.feedback_tooltip_content_rating,
        position: 'above-right',
        invokerSrText: $scope.messages.feedback_tooltip_content_rating
    };

    $scope.tooltipConfigExplanation = {
        text: $scope.messages.feedback_tooltip_content_explanation,
        position: 'above-right',
        invokerSrText: $scope.messages.feedback_tooltip_content_explanation
    };

    $scope.sendFeedbackForm = function () {
        $scope.sendFailed = false;


        if ($scope.feedbackForm.$valid) {
            var dataObject =
            {
                'type': 'RATING',
                'rating': $scope.data.rating,
                'text': $scope.data.opinion,
                'labels': $scope.labels
            };

            ingFeedbackService.insert(dataObject).then(function () {
                if (angular.isFunction($scope.onFeedbackSent)) {
                    $scope.onFeedbackSent(dataObject);
                }

                $scope.feedbackSent = true;
            }, function () {
                $scope.sendFailed = true;
            });
        } else {
            $scope.$broadcast('checkValidity');
        }
    };

}]);
/**
 * @ngdoc directive
 * @name ingComponents.servicePhone.directive:ing-service-phone-info
 * @restrict EA
 * @element div
 * @function
 *
 * @param {String} url the API URL
 * @description
 * This directive shows the masked service phone of the client and a link to change it inline. If no service phones can be found, it shows an input field instead.
 * When editing the service phone, you should see an empty input field and NOT the original service phone.
 *
 * You cannot access the data directly, but instead you should inject the <strong>infoBrokerService</strong> into your controller/service.
 * The infoBroker enables you to access the data and send the data to the server when in edit mode (via its synchronize function).
 *
 * You need to add the <strong>ingComponents.servicePhone</strong> module into your app dependencies to enable the directive in your app.
 *
 *
 * **Note:** the endpoint of the api is /particulier/ik-en-ing/api/phone as default. You can override with parameter: url
 * This means that this directive can only be used for 'particulier' clients!
 *
 * @example
 * Assuming the infoBrokerService is injected in your service/controller, you can access the data by checking the ingServicePhoneInfo namespace of the info object.
 * Before getting the data, you should first synchronize the data via the infoBrokerService, which returns a promise.
 * When the promise is resolved, you can safely access the data.
 * <pre>
 *     infoBrokerService.synchronize().then(function() {
     *         var servicePhone = infoBrokerService.info.ingServicePhoneInfo.phoneNumber
     *     }, function(state){
     *          // do something with the state (error of invalid)
     *     })
 * </pre>
 *
 <example>
 <file name="ing-service-phone.html">
     <form role="form" class="form-horizontal">
         <div ing-service-phone-info url="http://ing.nl"></div>
     </form>
 </file>
 </example>
 *
 */

/**
 * @ngdoc event
 * @name ingComponents.servicePhone.directive:ing-service-phone-info#$destroy
 * @eventOf ingComponents.servicePhone.directive:ing-service-phone-info
 * @eventType watch on $scope
 * @description
 * The directive interacts with the outside world via the infoBrokerService. When the directive is removed
 * from the DOM, it is still available in the infoBroker. In general it is good practice to broadcast the $destroy
 * event when the DOM is changed. This directive does the necessary cleanup when broadcast
 */

/**
 * @ngdoc event
 * @name ingComponents.servicePhone.directive:ing-service-phone-info#checkValidity
 * @eventOf ingComponents.servicePhone.directive:ing-service-phone-info
 * @eventType watch on $scope
 * @description
 * When the directive is part of a form, it automatically listens for checkValidity events that are broadcast
 * for this form.
 */


'use strict';

/* Directive for entering or altering servicePhoneNumber  */

angular.module('ingComponents.servicePhone').directive('ingServicePhoneInfo', ['$compile','propertyService', function(){
    var template = {
        loading :
            '<div ing-form-row label="{{servicePhoneMessages.FIELD_CONTACTTelephoneNumber}}">'+
                '<div class="form-control-static" ing-spinner size="sm"></div>'+
            '</div>',
        edit :
            '<div>' +
                '<div ng-if="data.phoneNumberMasked" id="service-phone-current-number" ng-bind="TXT_CurrentTelephoneNumberNew"></div>' +
                '<div ing-validation-group name="ingServicePhoneInfo">' +
                    '<div ing-form-row label="{{servicePhoneMessages.FIELD_CONTACTTelephoneNumber}}">'+
                        '<div ng-if="data.phoneNumberMasked">' +
                            '<div class="row">' +
                                '<div class="col-lg-9">' +
                                    '<div class="input-group">' +
                                        '<input ng-change="resetValidity()" class="form-control" ng-disabled="data.updating" type="text" ng-model="newValues.newPhoneNumber" id="servicePhoneInput" name="servicePhoneInput" maxlength="120" ing-required />' +
                                        '<span class="input-group-btn">' +
                                            '<button type="button" class="btn btn-primary" id="savePhoneNumber" ng-click="save()">{{servicePhoneMessages.TXT_ActionSave}}</button>' +
                                        '</span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-3">' +
                                    '<button type="button" id="phoneCancelLink" class="btn btn-secondary" ng-click="cancel()">{{servicePhoneMessages.TXT_ActionCancel}}</button>' +
                                '</div>' +
                            '</div>' +
                            '<div>' +
                                '<div ing-notify on-element="servicePhoneInput" validate="ingRequired">'+
                                    '<div ing-notification type="error"><span id="errorNotification" ng-bind="servicePhoneMessages.MSG_FuncValSingle_MandatoryFieldEmpty"></span></div>' +
                                '</div>' +
                                '<div ing-notify on-element="servicePhoneInput" validate="invalidServicePhone">'+
                                    '<div ing-notification type="error"><span id="errorNotification" ng-bind="servicePhoneMessages.MSG_FuncValSingle_PhoneNumberInvalid"></span></div>' +
                                '</div>' +
                                '<div ing-notify on-element="servicePhoneInput" validate="notSaved">' +
                                    '<div ing-notification type="error"><span id="errorNotification" ng-bind="servicePhoneMessages.MSG_Func_ServicePhoneNumberNotSaved"></span></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="help-block" id="service-phone-explanation">{{servicePhoneMessages.TXT_ExplanationServicePhoneNumber}}</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>',
        error:
            '<div id="phoneErrorNotification" ing-form-row label="{{servicePhoneMessages.FIELD_CONTACTTelephoneNumber}}">'+
                '<div ing-notification type="error"><span id="errorNotification" ng-bind="servicePhoneMessages.MSG_Tech_ServiceErrorServicePhoneNumber"></span></div>' +
                '<input type="hidden" id="servicePhoneValid" ng-model="data.dummy" name="servicePhoneValid" />' +
            '</div>',
        show :
            '<div ing-form-row label="{{servicePhoneMessages.FIELD_CONTACTTelephoneNumber}}" class="form-inline">' +
                '<div>' +
                    '<p class="form-control-static" id="service-phone-current-number">{{data.phoneNumberMasked}}</p><button type="button" id="phoneChangeLink" class="btn btn-default" ng-click="edit()">{{servicePhoneMessages.TXT_ActionChange}}</button>' +
                '</div>' +
                '<div ng-if="successNotificationServicePhoneChanged.message != null" ing-notification type="{{successNotificationServicePhoneChanged.type}}"><span id="succesNotification" ng-bind="successNotificationServicePhoneChanged.message"></span></div>' +
                '<div ng-if="errorState === \'save\'" ing-notification type="error"><span id="errorNotification" ng-bind="servicePhoneMessages.MSG_Tech_ServiceErrorUpdateServicePhoneNumber"></span></div>' +
                '<input type="hidden" id="servicePhoneValid" ng-model="data.dummy" name="servicePhoneValid" />' +
            '</div>',
        empty:
            '<div>' +
                '<div ing-validation-group name="ingServicePhoneInfo">' +
                    '<div ing-form-row label="{{servicePhoneMessages.FIELD_CONTACTTelephoneNumber}}">'+
                        '<div>' +
                            '<button type="button" class="btn btn-default" id="enterNewPhoneNumber" ing-modal partial="partials/ingServicePhone.html" size="md" title="{{servicePhoneMessages.BB_CreateServicePhoneNumber_Dialog_Title}}">{{servicePhoneMessages.TXT_ServicePhoneNumberUnknown}}</button>' +
                        '</div>' +
                        '<div ing-notify on-element="servicePhoneEmpty" validate="servicePhoneEmpty">' +
                            '<div ing-notification type="error"><span id="errorNotification" ng-bind="servicePhoneMessages.MSG_FuncValSingle_ServicePhoneNumberMandatory"></span></div>' +
                        '</div>' +
                        '<div class="help-block" id="unknownPhoneNumber">{{servicePhoneMessages.TXT_ExplanationServicePhoneNumberUnknown}}</div>' +
                        '<input type="hidden" id="servicePhoneEmpty" ng-model="data.dummy" name="servicePhoneEmpty" />' +
                    '</div>' +
                '</div>' +
            '</div>'
    };

    return {
        template: '<div ng-form="ingServicePhoneForm">' +
            '<div ng-if="data.state === \'loading\'">' + template.loading + '</div>' +
            '<div ng-if="data.state === \'valid\' || (data.state === \'error\' && errorState === \'save\')">' + template.show + '</div>' +
            '<div ng-if="data.state !== \'valid\' && data.state !== \'error\' && data.state !== \'empty\'" ng-show="data.state === \'edit\' || data.state === \'invalid\'">' + template.edit + '</div>' +
            '<div ng-if="data.state === \'empty\'">' + template.empty + '</div>' +
            '<div ng-if="data.state === \'error\' && errorState !== \'save\'">' + template.error + '</div>' +
            '</div>' +
            '<script type="text/ng-template" id="partials/ingServicePhone.html">' +
            '<div><div ing-service-phone-new url="{{url}}"></div></div>' +
            '</script>',
        restrict: 'EA',
        scope: {
            url: '@url',
            required: '@required'
        },
        controller: 'ingServicePhoneController',
        link: function postLink(scope, element, attrs, ctrl) {
            var destroyListener = scope.$on('$destroy', function () {
                ctrl.unregister();
                destroyListener.call();
            });
            ctrl.register();
        }
    };
}]);

angular.module('ingComponents.servicePhone').controller('ingServicePhoneController', ['$scope','infoBrokerService', 'servicePhoneService','propertyService', function ($scope, infoBrokerService, servicePhoneService, propertyService) {
    var controller = this;

    $scope.origValues = {};
    $scope.successNotificationServicePhoneChanged = {};
    $scope.newValues = {
        newPhoneNumber: null
    };

    $scope.servicePhoneMessages = propertyService.properties('ingComponents.servicePhone');

    var endpoint = $scope.url || '/particulier/ik-en-ing/api/phone';
    $scope.isRequired = $scope.required === 'false' ? false : true;

    $scope.data = {
        phoneNumber: null,
        phoneNumberMasked: null,
        allowCommercialOffers: null,
        state: 'loading',
        formValid: true
    };

    $scope.edit = function () {
        $scope.newValues.newPhoneNumber = '';
        $scope.data.state = 'edit';
        $scope.successNotificationServicePhoneChanged = {};
    };

    $scope.cancel = function () {
        $scope.data.phoneNumber = $scope.origValues.phoneNumber;
        $scope.data.state = 'valid';
        $scope.errorState = '';
        $scope.data.formValid = true;
    };

    $scope.save = function () {
        $scope.ingServicePhoneForm.ingServicePhoneInfo.servicePhoneInput.$setValidity('notSaved', true);
        controller.validate();
        $scope.errorState = '';
    };

    $scope.resetValidity = function () {
        $scope.ingServicePhoneForm.ingServicePhoneInfo.servicePhoneInput.$setValidity('invalidServicePhone', true);
    };

    controller.getServicePhone = function(initial) {

        $scope.data.state = 'loading';
        $scope.errorState = '';

        servicePhoneService.get(endpoint, function (result) {

            if (result.state !== 'error') {

                if (!initial) {
                    if ($scope.origValues.phoneNumber && $scope.origValues.phoneNumber !== result.phoneNumber) {
                        $scope.successNotificationServicePhoneChanged.type = 'SUCCESS';
                        $scope.successNotificationServicePhoneChanged.message = $scope.servicePhoneMessages.MSG_Func_UpdateServicePhoneNumberSuccessful;
                    } else if (!$scope.origValues.phoneNumber && result.phoneNumber) {
                        $scope.successNotificationServicePhoneChanged.type = 'SUCCESS';
                        $scope.successNotificationServicePhoneChanged.message = $scope.servicePhoneMessages.MSG_Func_CreateServicePhoneNumberSuccessful;
                    }
                }

                $scope.data.phoneNumber = result.phoneNumber;
                $scope.data.phoneNumberMasked = result.phoneNumberMasked;
                $scope.data.allowCommercialOffers = result.allowCommercialOffers;
                $scope.data.state = result.state;
                $scope.origValues.phoneNumber = result.phoneNumber;
                $scope.origValues.phoneNumberMasked = result.phoneNumberMasked;
                $scope.TXT_CurrentTelephoneNumberNew = $scope.servicePhoneMessages.TXT_CurrentTelephoneNumber.replace('{$currentPhoneNumberStarred}', $scope.data.phoneNumberMasked);

            } else {

                $scope.data.state = 'error';
                $scope.errorState = 'get';

            }

        });
    };

    controller.saveData = function () {

        $scope.$broadcast('checkValidity');

        if ($scope.data.state === 'edit') {
            controller.validate();
        } else if ($scope.data.state === 'valid') {
            if ($scope.newValues.newPhoneNumber && $scope.newValues.newPhoneNumber !== $scope.origValues.phoneNumber) {

                $scope.data.state = 'loading';
                $scope.data.phoneNumber = $scope.newValues.newPhoneNumber;

                var postData = {
                    phoneNumber: $scope.newValues.newPhoneNumber,
                    allowCommercialOffers: $scope.data.allowCommercialOffers
                };
                servicePhoneService.save(endpoint, postData, function (result) {
                    if (result.state === 'valid') {
                        controller.getServicePhone();
                    } else if (result.state === 'edit') {
                        $scope.data.state = 'edit';
                        $scope.ingServicePhoneForm.ingServicePhoneInfo.servicePhoneInput.$setValidity('invalidServicePhone', false);
                        $scope.$broadcast('checkValidity');
                    } else {
                        $scope.data.state = 'error';
                        $scope.errorState = 'save';
                        $scope.newValues.newPhoneNumber = '';
                    }

                });
            }
        }
    };

    controller.register = function () {

        var dataCopy = {
            data: {
                phoneNumber: null,
                phoneNumberMasked: null,
                allowCommercialOffers: null,
                state: 'loading'
            }
        };

        $scope.$watch('data', function (data) {
            dataCopy.data.phoneNumber = data.phoneNumber;
            dataCopy.data.phoneNumberMasked = data.phoneNumberMasked;
            dataCopy.data.allowCommercialOffers = data.allowCommercialOffers;

            var isInvalid = ($scope.data.state === 'empty' && $scope.isRequired) || ($scope.data.state === 'error' && $scope.errorState === 'get' && $scope.isRequired) || $scope.data.state === 'edit' || $scope.data.state === 'invalid';

            dataCopy.data.state = $scope.data.formValid === false || isInvalid ? 'invalid' : ( $scope.data.state === 'loading' ? $scope.data.state : 'valid' );

        }, true);

        infoBrokerService.register('ingServicePhoneInfo', dataCopy.data, controller.synchronize);
    };

    controller.unregister = function () {
        infoBrokerService.unregister('ingServicePhoneInfo');
    };

    controller.validate = function () {
        $scope.data.state = $scope.ingServicePhoneForm.$valid === true ? 'valid': 'invalid';
        controller.saveData();
    };

    controller.synchronize = function () {
        $scope.$broadcast('checkValidity');
    };

    $scope.$on('checkValidity', function () {
        if ($scope.data.state === 'invalid' && $scope.ingServicePhoneForm.$valid === true) {
            $scope.data.state = 'edit';
        }
        if ($scope.data.state === 'edit' && $scope.origValues.phoneNumber && $scope.ingServicePhoneForm.ingServicePhoneInfo.servicePhoneInput.$invalid === false) {
            $scope.ingServicePhoneForm.ingServicePhoneInfo.servicePhoneInput.$setValidity('notSaved', false);
        }
        if ($scope.data.state === 'empty' && $scope.isRequired) {
            $scope.ingServicePhoneForm.ingServicePhoneInfo.servicePhoneEmpty.$setValidity('servicePhoneEmpty', false);
        }
        if ($scope.data.state === 'error' && $scope.errorState === 'get' && $scope.isRequired && $scope.ingServicePhoneForm.servicePhoneValid) {
            $scope.ingServicePhoneForm.servicePhoneValid.$setValidity('servicePhoneValid', false);
        }

        $scope.data.formValid = $scope.ingServicePhoneForm.$valid;

    });

    $scope.$on('servicePhoneNumberSaved', function(event) {
        event.stopPropagation();
        controller.getServicePhone();
        $scope.data.formValid = true;
    });

    controller.getServicePhone(true);

}]);

angular.module('ingComponents.servicePhone').directive('ingServicePhoneNew', ['$compile', 'propertyService', function () {
    return {
        template:
           '<div>' +
               '<div class="panel panel-a panel-radius">'+
                '<div ng-show="data.state == loading" class="h-text-center">' +
                    '<div class="panel-heading">' +
                        '<h3 class="panel-title panel-title-primary">Even geduld a.u.b.</h3>' +
                    '</div>' +
                    '<div class="panel-body l-pt-1 l-pb-2">' +
                        '<div ing-spinner size="lg"></div>' +
                    '</div>' +
                '</div>' +
                '<div ng-show="data.state != loading">' +
                    '<div class="panel-heading" id="servicePhoneHeading">' +
                        '<h3 class="panel-title panel-title-primary">{{servicePhoneMessages.BB_CreateServicePhoneNumber_Dialog_Title}}</h3>'+
                    '</div>' +
                    '<div class="panel-body">' +
                        '<form class="form-horizontal" name="addNewServicePhoneForm" ng-submit="submit()" ing-form-grid label-width="4" field-width="8">' +
                        '<div ng-if="data.state === \'error\'">' +
                            '<div ing-notification type="error"><span ng-bind="servicePhoneMessages.MSG_Tech_ServiceErrorCreateServicePhoneNumber"></span></div>' +
                        '</div>' +

                        '<div ing-validation-group name="ingServicePhoneInfo" >' +
                            '<div ing-form-row for="servicePhoneNumber" id="newPhoneNumberLabel" label="{{servicePhoneMessages.FIELD_CONTACTTelephoneNumber_Create}}">' +
                                '<div class="row">' +
                                    '<div class="col-lg-11">' +
                                        '<input ng-change="resetValidity()" type="text" class="form-control" name="servicePhoneNumber" id="servicePhoneNumber" ng-model="newValues.newPhoneNumber" ing-required />' +
                                    '</div>' +
                                '</div>' +
                               '<div ing-notify on-element="servicePhoneNumber" validate="ingRequired">' +
                                    '<div ing-notification type="error"><span ng-bind="servicePhoneMessages.MSG_FuncValSingle_MandatoryFieldEmpty"></span></div>' +
                               '</div>' +
                               '<div ing-notify on-element="servicePhoneNumber" validate="invalidServicePhone">'+
                                    '<div ing-notification type="error"><span ng-bind="servicePhoneMessages.MSG_FuncValSingle_PhoneNumberInvalid"></span></div>' +
                               '</div>' +
                            '</div>' +
                        '</div>' +

                        '<div ing-validation-group>' +
                            '<div ing-form-row class="l-mt-n1 l-mb-3">' +
                                '<div class="row">' +
                                    '<div class="col-lg-11">' +
                                        '<div class="help-block" id="service-phone-explanation" ng-bind="servicePhoneMessages.TXT_ExplanationServicePhoneNumber"></div>' +
                                        '<label class="checkbox" id="servicePhoneOffersCheckbox">' +
                                            '<input type="checkbox" name="allowCommercialOffers" ng-model="data.allowCommercialOffers" /> {{servicePhoneMessages.TXT_OptionCommercialOffersPhoneNumber}}' +
                                        '</label>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +

                       '<fieldset>' +
                           '<div class="form-group btn-bar">' +
                                '<legend class="sr-only"></legend>' +
                               '<div ing-form-grid-label>' +
                                    '<button ng-click="close()" id="phoneNumberCancelLink" class="btn btn-secondary" type="button">{{servicePhoneMessages.TXT_ActionCancel}}</button>' +
                               '</div>' +
                               '<div ing-form-grid-field>' +
                                   '<button id="phoneNumberSaveButton" id="phoneNumberSaveButton" type="submit" class="btn btn-primary">{{servicePhoneMessages.TXT_ActionSave}}</button>' +
                               '</div>' +
                           '</div>' +
                       '</fieldset>' +
               '</div>' +
            '</div>'+
        '</div>',

        restrict: 'EA',
        scope: {
            url: '@url'
        },
        link: function(scope, element) {
            scope.formController = element.find('[name=addNewServicePhoneForm]').scope().addNewServicePhoneForm;
        },
        controller: 'ingServicePhoneNewCtrl'
    };
}]);

angular.module('ingComponents.servicePhone').controller('ingServicePhoneNewCtrl', ['$scope', '$timeout', 'propertyService', 'infoBrokerService','servicePhoneService', function ($scope,$timeout, propertyService, infoBrokerService, servicePhoneService) {

    var controller = this;
    var endpoint = $scope.url || '/particulier/ik-en-ing/api/phone';

    $scope.newValues = {
        newPhoneNumber: null
    };

    $scope.servicePhoneMessages = propertyService.properties('ingComponents.servicePhone');

    $scope.data = {
        allowCommercialOffers: false,
        state: 'edit',
        phoneNumber: null
    };

    $scope.submit = function() {
        $scope.$broadcast('checkValidity');

        if ($scope.formController.$valid) {

            controller.saveData();

        }

    };

    controller.saveData = function() {

        $scope.data.state = 'loading';

        var postData = {
            phoneNumber: $scope.newValues.newPhoneNumber,
            allowCommercialOffers: $scope.data.allowCommercialOffers
        };

        servicePhoneService.save(endpoint, postData, function (result) {

            if (result.state === 'valid') {
                $scope.close();
                $timeout( function() {
                    $scope.$emit('servicePhoneNumberSaved');
                });
            } else if (result.state === 'edit') {
                $scope.data.state = 'edit';
                $scope.formController.ingServicePhoneInfo.servicePhoneNumber.$setValidity('invalidServicePhone', false);
                $scope.$broadcast('checkValidity');
            } else {
                $scope.data.state = 'error';
            }

        });

    };

    $scope.resetValidity = function () {
        $scope.formController.ingServicePhoneInfo.servicePhoneNumber.$setValidity('invalidServicePhone', true);
    };

    $scope.close = function() {
        $scope.$emit('modal-close');
    };

}]);

'use strict';

/**
 * FIXME: The form-validation should not be the only check whether to proceed with validation, error states should be remembered by the directive and not through form-validation as that is DOM which not be updated yet.
 * FIXME: The displaying of errors should not be triggered by an event but through a directive on the input field that uses a $scope variable.
 * FIXME: S code events should be done via a service.
 */

/**
 * @ngdoc directive
 * @name ingComponents.tan.directive:ing-tan
 * @restrict EA
 * @scope
 * @requires ingGlobal
 *
 * @param {String} id The AuthorizationRequestID
 *
 * @description
 * Directive rendering and handling the TAN validation input
 *
 * @example
 <example>
 <file name="ing-tan.html">
 <form role="form" class="form-horizontal" ng-submit="verzenden()">
 <div ing-tan id="tan.id"></div>
 <fieldset>
 <div class="form-group btn-bar">
 <div class="col-lg-6 col-lg-offset-3">
 <button class="btn btn-primary icon-position icon-after icon-position-lg" type="submit">Verzenden <i class="icon icon-arrow-g-right icon-lg" aria-hidden="true"></i></button>
 </div>
 </div>
 </fieldset>
 </form>
 </file>

 <file name="Ctrl.js">
 angular.module('example', ['ingGlobal', 'ingTan']);
 function Ctrl($scope) {
    $scope.tan = { id: '1234' };

    // Add the submit button to the page and $broadcast the sendTan event to indicate that the Tan check should be performed
    $scope.verzenden = function() {
        $scope.$broadcast('sendTan');
    };

    // The sendTan event uses an $emit to hand the control and the result back to the controller.
    // Catch this with a $on implementation like:
    $scope.$on('resultSendTan',function(event,resultData){
        if(event.stopPropagation) {
            event.stopPropagation();  // stop further propagation
        }

        // process the result

        if(resultData.tanok === true) {
            // tan is valid
            if(resultData.messageIndication === true) {
                // customer gets a new tan list, allow for message to be shown
            } else {
                // continue to next step in application
            }
        } else {
            // tan validation failed
        }
    });



 }
 </file>
 </example>
 */

/**
 * @ngdoc event
 * @name ingTan.directive:ing-tan#resultSendTan
 * @eventOf ingComponents.tan.directive:ing-tan
 * @eventType $emit on $scope
 * @description Sends the result of the tan check with the following data:
 *              'tanok': boolean,  messageIndication: undefined or true
 */

/**
 * @ngdoc event
 * @name ingTan.directive:ing-tan#sendTan
 * @eventOf ingComponents.tan.directive:ing-tan
 * @eventType $broadcast on $scope
 * @description Signal the directive to validate the TAN
 */

angular.module('ingComponents.tan').directive('ingTan', function () {
    return {
        restrict: 'EA',
        scope: {
            authid: '=id'
        },
        controller: 'ingTanCtrl',
        replace: true,
        template:
            '<div>' +
                '<ng-form id="authorizeTanForm" name="authorizeTanForm" ng-show="showForm">' +
                    '<div ing-form-row label="{{messages.FIELD_AUTHChallenge}}" id="tanSequenceNumberLabel" class="form-text-only">' +
                        '<p ng-bind="tanData.tanSequenceNumber" class="form-control-static" id="tanSequenceNumber"></p>' +
                    '</div>' +
                    '<div ing-validation-group id="validateTan" name="validateTanGroup" setstate="{{ extern }}">' +
                        '<div ing-form-row id="gauthorizeValidationInputLabel" label="{{messages.FIELD_AUTHChallengeResponse}}" for="gauthorizeValidationInput" info-popover="tooltip" ing-form-grid label-width="3" field-width="9">' +
                            '<div class="row">' +
                                '<div class="col-lg-3">' +
                                    '<input class="form-control" type="text" name="gauthorizeValidationInput" id="gauthorizeValidationInput" maxlength="6" ng-model="formData.gauthorizeValidationInput" ing-required ng-minlength="6" ing-number ng-maxlength="6" ng-focus="hideNotification()" ing-tan-validate/>' +
                                '</div>' +
                                '<div class="col-lg-9">' +
                                    '<button type="button" ng-click="noTanReceived()" class="btn btn-default" ng-if="tanData.means ==\'sms\' && !tanData.callMeNowShow" id="noTanReceivedLink">Geen TAN-code ontvangen?</button>' +
                                '</div>' +
                            '</div>' +
                            '<div ing-notify on-element="gauthorizeValidationInput" validate="ingRequired">' +
                                '<div ing-notification type="error"><span ng-bind-html="messages.labels_TXT_INGTAN_Tancode_Required"></span></div>' +
                            '</div> ' +
                            '<div ing-notify on-element="gauthorizeValidationInput" validate="ingNumber">' +
                                '<div ing-notification type="error"><span ng-bind-html="messages.labels_TXT_INGTAN_tan_format_invalid"></span></div>' +
                            '</div> ' +
                            '<div  ing-notify on-element="gauthorizeValidationInput" validate="!ingNumber && minlength">' +
                                '<div ing-notification type="error"><span ng-bind-html="messages.labels_TXT_INGTAN_tan_format_invalid"></span></div>' +
                            '</div> ' +
                            '<div ing-notify on-element="gauthorizeValidationInput" validate="!ingNumber && maxlength">' +
                                '<div ing-notification type="error"><span ng-bind-html="messages.labels_TXT_INGTAN_tan_format_invalid"></span></div>' +
                            '</div> ' +
                            '<div ing-notify on-element="gauthorizeValidationInput" validate="ingTanValidate">' +
                                '<div ing-notification type="error"><span ng-bind-html="tanErrorMessage"></span></div>' +
                            '</div> ' +
                            '<div id="tanExplanation" class="help-block" ng-bind="tanData.tantoelichting" ng-show="!tanData.callMeNowShow"></div>' +
                        '</div>' +
                    '</div>' +
                '</ng-form>' +
                '<div class="row">' +
                    '<div class="col-lg-9" ng-show="tanData.notificationConfig && tanData.notificationConfig.message">' +
                        '<div ing-notification type="{{tanData.notificationConfig.notificationType}}"><span id="ingTanNotification" ng-bind-html="tanData.notificationConfig.message"></span></div>' +
                    '</div>' +
                '</div>' +
                '<div class="row">' +
                    '<div class="col-lg-offset-3 col-lg-9" ng-show="tanData.callMeNowShow && !tanData.notificationConfig" id="callMeNow">' +
                        '<div ing-notification type="warning"><span ng-bind-html="messages.BB_AuthorizeBySMSAlternative_Intro"></span></div>' +
                    '</div>' +
                '</div>' +
            '</div>'
    };
});

/* global s */
angular.module('ingComponents.tan').controller('ingTanCtrl', ['$scope', 'ingTanService', '$timeout', 'propertyService',
    function ($scope, ingTanService, $timeout, propertyService) {

        $scope.messages = propertyService.properties('ingComponents.tan.labels');

        $scope.tanData = {
            deliverymode: '',
            tanSequenceNumber: '',
            means: '',
            tantoelichting: '',
            notificationConfig: null,
            callMeNowShow: false
        };

        // @todo use attributes for the tooltip when change request for info tooltip has merged
        $scope.tooltip = { title: 'Toelichting', text: '', position: 'above-right' };

        $scope.formData = { gauthorizeValidationInput: '' };
        var sendLock = false,
            done = false;

        /**
         * takes care of setting application wide measurement settings
         * and firing the actual measurement. Additional properties of s can be set
         * before calling this function
         *
         */
        var measure = function () {  // app wide s-code settings
            s.singlePage = 'true';
            s.pageEvent();
        };
        /**
         * Emit the TAN Result and register that we are done.
         * @param resultData
         */
        var finalize = function (resultData) {
            done = true;
            $scope.$emit('resultSendTan', resultData);
        };

        /**
         * Retrieves the TAN data and set the view variables
         *
         * @param {string|integer} deliverymodeParam 1 for normal, 2 for Call Me Now
         * @param {string|integer} authid The AuthorizationRequestID
         */
        var initData = function (deliverymodeParam) {
            sendLock = false;
            done = false;

            ingTanService.initiateTan(deliverymodeParam, $scope.authid).then(
                function success(result) {

                    $scope.tanData.deliverymode = deliverymodeParam;

                    if (result.means === 'list') {
                        $scope.tooltip.text = $scope.messages.labels_TXT_INGTAN_Tooltip_Text_Lijst;
                        $scope.tanData.tantoelichting = $scope.messages.BB_AuthorizeByTAN_MandatoryExplanation;
                    } else if (result.means === 'sms') {
                        $scope.tooltip.text = $scope.messages.labels_TXT_INGTAN_Tooltip_Text_SMS;
                        $scope.tanData.tantoelichting = $scope.messages.labels_TXT_INGTAN_Tan_Code_SMS_Toelichting;
                    } else {
                        serverError();
                        return;
                    }

                    if (!result.challenge || result.challenge === '') {
                        serverError();
                        return;
                    }

                    $scope.tanData.tanSequenceNumber = result.challenge;
                    $scope.tanData.means = result.means;
                    $scope.showForm = true;

                    // @todo nog vervangen door directive
                    $timeout(function () {
                        angular.element('#gauthorizeValidationInput').focus();
                    });

                    if (typeof s !== 'undefined') {
                        if ($scope.tanData.means === 'list') {
                            s.formextra8 = 'TAN lijst';
                        } else {
                            s.formextra8 = 'SMS tan';
                        }
                        measure();
                    }
                },
                function error(result) {

                    var errorMessage = result.errorMessage;
                    var errorKey = result.errorKey;

                    displayNotification('ERROR', errorMessage);

                    finalize({ 'tanok': false });

                    if (typeof s !== 'undefined') {
                        s.error = errorKey;
                        measure();
                    }
                }
            );
        };

        /**
         * Initialise the data again, this time for a call me now
         * Also set the view correctly to explain what is going to happen
         * @param authid the AuthorizationRequestID
         */
        $scope.noTanReceived = function () {
            initData('2'); // fetch the data
            $scope.tanData.callMeNowShow = true; // tell the view to show and hide the right fields
        };

        /**
         * Display a notification message
         * @param {string} type, one of error | warning | info | success
         * @param {string} message
         */
        var displayNotification = function (type, message) {
            $scope.tanData.notificationConfig = {};
            $scope.tanData.notificationConfig.notificationType = type;
            $scope.tanData.notificationConfig.message = message;
        };

        /** Displays a generic server error and hands the control back to the including application. */
        var serverError = function () {
            displayNotification('ERROR', $scope.messages.MSG_Tech_Error);
            finalize({ 'tanok': false });
            if (typeof s !== 'undefined') {
                s.error = 'MSG_Tech_Error';
                measure();
            }
        };

        /** Hide the notification message, */
        $scope.hideNotification = function () {
            $scope.tanData.notificationConfig = null;
        };

        $scope.$watch('authid', function () {
            $scope.hideNotification();

            if (typeof $scope.authid === 'undefined' || $scope.authid === null || $scope.authid.length === 0) {
                //FIXME this notification message is not set! So message is never shown!
                $scope.showForm = false;
                displayNotification('ERROR', $scope.messages.labels_TXT_DUMMYTAN_Service_Not_Available);
            } else { // get application data
                initData('1');
            }
        });

        /** Used by the enter key listener to submit the tan. */
        $scope.enterTan = function () {
            $scope.$broadcast('sendTan');
        };

        /** Listens for the sendTan broadcast and asks the backend to validate the TAN. */
        $scope.$on('sendTan', function () {
            $scope.tanData.callMeNowShow = false;
            if (!$scope.tanData.notificationConfig) {

                // Should contain a check whether 'DONE', still waiting for answer when the directive/TAN is considered done.
                // see: https://jira.europe.intranet/browse/GAN-325
                if ($scope.authorizeTanForm.$valid && sendLock === false && done === false) {
                    sendLock = true;
                    ingTanService.validateTanResponse($scope.tanData.deliverymode, $scope.authid, $scope.formData.gauthorizeValidationInput, $scope.tanData.means).then(
                        function success(result) {

                            if (result.invalidTan) {
                                $scope.tanData.tanSequenceNumber = result.challenge;
                                $scope.tanErrorMessage = $scope.messages.labels_TXT_INGTAN_Tan_Validation_Failed_LIST;
                                $scope.$broadcast('invalidTan');
                                $scope.$broadcast('checkValidity');
                            } else if (result.newList === true) {
                                $scope.showForm = false;
                                displayNotification('WARNING', $scope.messages.MSG_Func_AuthorizationSuccessfullNewList);
                                finalize({ 'tanok': true, 'messageIndication': true });
                            } else if (result.newList === false) {
                                finalize({ 'tanok': true, 'messageIndication': false });
                            } else {
                                displayNotification('ERROR', $scope.messages.MSG_Tech_Error);
                                finalize({ 'tanok': false });
                            }
                            // This sendLock = false enables the validation to be repeated once the response from the server
                            // has been repeated. Therefore an extra 'done' check should be performed see ^^.
                            sendLock = false;
                        },
                        function error(result) {

                            sendLock = false;

                            if (result.invalidTan) {
                                $scope.tanErrorMessage = result.errorMessage;
                                $scope.$broadcast('invalidTan');
                                $scope.$broadcast('checkValidity');
                                return;
                            }

                            var errorMessage = result.errorMessage || $scope.messages.MSG_Tech_Error;
                            var errorKey = result.errorKey;

                            $scope.showForm = false;
                            displayNotification('ERROR', errorMessage);
                            finalize({ 'tanok': false });

                            if (typeof s !== 'undefined') {
                                s.error = errorKey;
                                measure();
                            }
                        });
                } else { // trigger the validation group to show the errors
                    $scope.$broadcast('checkValidity');
                }
            }
        });
    }]);
'use strict';

angular.module('ingComponents.gsaSearchBox')

    .filter('highlight', ['$sce', function ($sce) {
        return function (input, searchParam) {
            if (typeof input === 'function') { return ''; }
            if (searchParam) {
                searchParam = searchParam.replace(/^\'\s*|<[^>]+>|\'\s*$/gm, '');
                searchParam = searchParam.replace(/[-[\]{}()*+?.\\^$|#]/g,'\\$&');
                var words = '(' + searchParam + '|' +
                        searchParam.split(/\ /).join(' |') + '|' +
                        searchParam.split(/\ /).join('|') +
                        ')',
                    exp = new RegExp(words, 'i');

                input = input.replace(exp, '<span class="arial-r-md">$1</span>');
            }
            return $sce.trustAsHtml(input);
        };
    }])

    .filter('htmlToPlaintext', function() {
        return function (text) {
            if (angular.isDefined(text)){
                    return String(text).
                        replace(/&amp;/g, '&').
                        replace(/&lt;/g, '<').
                        replace(/&gt;/g, '>').
                        replace(/&#39;/g, '\'').
                        replace(/&#039;/g, '\'').
                        replace(/&quot;/g, '"').
                        replace(/<[^>]+>/gm, ''); // this last replace takes out any HTML tags (if they're there)
            }
        }
    })

    .filter('limitLength', function () {
        return function (value, wordwise, max, tail) {
            if (!value) { return ''; }

            max = parseInt(max, 10);
            if (!max) { return value; }
            if (value.length <= max) { return value; }

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace !== -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' ...');
        };
    })
'use strict';

angular.module('ingComponents.correspondenceAddress').factory('correspondenceAddressService', ['$resource',
    function ($resource) {
        function get(url, success) {
            return $resource(url).get({},
                function (data) {
                    var theAddress = {};
                    var result = {};
                    result.addressLines = [];
                    result.validity = 'INVALID';

                    if (angular.isObject(data.correspondenceAddress) && angular.isObject(data.correspondenceAddress.currentAddress)) {
                        theAddress = data.correspondenceAddress.currentAddress
                    } else if (angular.isObject(data.residentialAddress) && angular.isObject(data.residentialAddress.currentAddress)) {
                        theAddress = data.residentialAddress.currentAddress
                    }
                    if (angular.isDefined(theAddress.validity)) {
                        result.validity = theAddress.validity;
                    }
                    if (angular.isDefined(theAddress.addressLines)) {
                        result.addressLines = theAddress.addressLines;
                    }
                    result.state = 'success';
                    success(result);
                },
                function (data) {
                    if (data.status === 404) {
                        // not found
                        data.state = '404';
                        success(data);
                    } else {
                        // some sort of real error
                        data.state = 'error';
                        success(data);
                    }
                });
        }

        // Public API here
        return {
            get: get
        };

    }
]);

'use strict';

angular.module('ingComponents.email').factory('emailInfoService', ['$resource', function ($resource) {
    function get(url, success) {
        return $resource(url).get({},
            function(data){
                // success
                data.state = data.emailAddress ?  'valid' : 'empty';
                data.emailValid = data.valid;
                success.call(null, data);
            },
            function(data) {
                // error
                if (data.status === 404) {
                    // not found
                    data.state = 'empty';
                    success.call(null, data);
                } else {
                    // some sort of real error
                    data.state = 'error';
                    success.call(null, data);
                }
            });
    }

    function save(url, data, success){
        return $resource(url).save(data, function(){
            data.state = 'valid';
            data.emailValid = true;
            success.call(null, data);
        },function(response){
            // status 400 means the new email address is invalid. An invalid email address can't be submitted, but in case it does happen we return state 'edit'.
            data.state = response.status === 400 ? 'edit' : 'error';
            success.call(null, data);
        });
    }

    // Public API here
    return {
        get : get,
        save: save
    };

}]);

'use strict';

angular.module('ingComponents.gsaSearchBox').provider('gsaSearchBoxConfig', function () {
    this.defaultOptions = {
        recommendApi: '/api/search/recommendations',
        suggestApi: '/api/search/terms',
        domain: 'zakelijk',
        domainTitle: 'Zakelijk',
        placeholder: 'Zoeken in {0}',
        buttonText: '',
        inputclass: 'form-control',
        resultPageUrl: undefined,
        suggestionsFoundForYou: 'Voor u gevonden',
        maxSuggest: 4,
        maxRecommend: 3,

        mainSiteCollection: 'ingnl',
        gsaFilterDomain: 'targetgroup',
        gsaFilterRecommended: 'aanbevolen',
        client: 'ingnl',
        searchProxyStyle: 'json_frontend',
        filter: 0,
        hl: 'nl'
    };

    this.setParam = function (param, value) {
        this.defaultOptions[param] = value;
    };

    this.$get = function () {
        var defaultOptions = this.defaultOptions;
        return {
            recommendApi: defaultOptions.recommendApi,
            suggestApi: defaultOptions.suggestApi,
            domain: defaultOptions.domain,
            domainTitle: defaultOptions.domainTitle,
            placeholder: defaultOptions.placeholder,
            buttonText: defaultOptions.buttonText,
            inputclass: defaultOptions.inputclass,
            resultPageUrl: defaultOptions.resultPageUrl,
            suggestionsFoundForYou: defaultOptions.suggestionsFoundForYou,
            maxSuggest: defaultOptions.maxSuggest,
            maxRecommend: defaultOptions.maxRecommend,

            mainSiteCollection: defaultOptions.mainSiteCollection,
            gsaFilterDomain: defaultOptions.gsaFilterDomain,
            gsaFilterRecommended: defaultOptions.gsaFilterRecommended,

            client: defaultOptions.client,
            searchProxyStyle: defaultOptions.searchProxyStyle,
            filter: defaultOptions.filter,
            hl: defaultOptions.hl
        }
    };
});


/**
 * @ngdoc service
 * @name ingComponents.gsaSearchBox:gsaSuggestionService
 * @requires $http, $q, propertyService
 *
 * @description
 * This service handles requests from the gsa auto-suggest searchBox controller,
 * and stores the configuration data
 *
 * public function:
 *         getTerms(inputstring), // Autosuggest for searchbox
 *         getRecommendations(inputstring), // List of top X search results
 *
 */
'use strict';


angular.module('ingComponents.gsaSearchBox').service('gsaSuggestionService', ['$resource', '$http', '$q', 'gsaSearchBoxConfig',
    function($resource, $http, $q, config){



    function getTerms(typedLetters) {
        var searchdata = $q.defer(),
            parameters = {
                'client' : config.client + config.domain + '_frontend',
                'site' : config.mainSiteCollection + config.domain,
                'max': config.maxSuggest,
                'q': typedLetters,
                'format':'rich'
        };

        $resource(config.suggestApi, parameters).get(
            function(gsadata) {
                searchdata.resolve(gsadata);
            },
            function(gsadata) {
                searchdata.reject(gsadata);
            }
        );
        return searchdata.promise;

    }



    function getRecommendations(typedLetters) {

        var searchdata = $q.defer(),
            parameters = {
                'client' : config.client + config.domain + 'stip_frontend',
                'proxystylesheet' : config.searchProxyStyle,
                'filter': config.filter,
                'getfields':'*',
                'site' : config.mainSiteCollection + config.domain + 'stip',
                'start':0,
                'num': config.maxRecommend,
                'q': typedLetters,
                'hl': config.hl
            };

        $resource(config.recommendApi, parameters).get(
            function(data) {

                var recommendations = [];
                if (data && data.RES) {
                    angular.forEach(data.RES, function (value) {
                        var item = {
                            'title': value.MT.title,
                            'text': value.MT.description || value.S,
                            'url': value.MT.displayurl,
                            'type': value.MT.informationtype || 'page'
                        };
                        recommendations.push(item);
                    });
                }

                searchdata.resolve(recommendations);
            },
            function(data) {
                searchdata.reject(data);
            }
        );
        return searchdata.promise;
    }


    //////////////////////////////
    // Public API Interface     //
    //////////////////////////////
    return {
        getTerms : getTerms, // Autosuggest for searchbox
        getRecommendations: getRecommendations // List of top X recommended item for searchbox
    };

}]);

/**
 * @ngdoc service
 * @name ingGlobal.infoBrokerService
 * @description
 * The infobroker enables you to interact with form-like directives as ingEmailInfo in your own form. These directives do not attach themselves
 * to a possible outer form, because this is error prone. Nevertheless, these directives listen for checkValidity events that are broadcasted and,
 * when in edit mode, check the validity of its content.
 *
 * The infobroker service enables apps to directly access the data of directives like ingEmailInfo. The data is shared via its info object,
 * that can be accessed via infoBrokerService.info . The info object contains all registered directives where the name of the directive is a
 * property name of the info object. So, for example, ingEmailInfo data is stored in infoBrokerService.info.ingEmailInfo.
 *
 * Even though the info object contains the actual values of the registered directives, chances are the user is editing the value. So before
 * continuing with the process in your app, you should call the synchronize function. There a three
 * possible state values returned by infoBroker: valid, invalid and error. Valid will be returned when all directives received a valid response when
 * retrieving the original data and (when in edit mode) successfully changed the value. In this case, the resolve function is called.
 * Invalid will be returned if the input of the user is not yet valid. The reject function is called with state as parameter with value 'invalid'
 * Error is returned when something more fatal happened from which it is not possible to recover. The reject function is called with state as parameter
 * with value 'error'
 *
 * @example
 * <pre>
 *     // broadcasting checkValidity to trigger information about validity of the registered directives, when in edit mode
 *     $scope.$broadcast('checkValidity');
 *
 *     // let the infoBroker tell all registered directives to save the data if necessary
 *     infoBrokerService.synchronize().then(function(state){
 *          // when all directives are valid, the resolve function is called. The state is 'valid'
 *          // getting the email address from the ingEmailInfo directive (as example)
 *          var emailAddress = infoBrokerService.info.ingEmailInfo.emailAddress
 *
 *          // --> continue with your process
 *
 *     }, function(state){
 *          if (state === 'invalid') {
 *              // one or more directives are invalid.
 *              // The user must provide valid data and start over
 *          } else {
 *              // something fatal happened, probably something we cannot recover from.
 *              // state==='error' in this case
 *          }
 *     })
 * </pre>
 */

'use strict';

angular.module('ingComponents.infoBroker').factory('infoBrokerService', ['$q', function ($q) {
    var info = {};
    var senders = {};
    var listeners = [];

    /**
     * registering an info object (usually a part of the scope of a directive
     * @param name = name of the directive
     * @param data = (part) of the (isolated) scope that is shared via this service
     * @param sender = callback to directive to save info when in edit mode
     * @return returning the update callback to notify the broker of a state change
     */
    function register(name, data, sender) {
        info[name] = data;
        senders[name] = sender;
        return update;
    }

    /**
     * unregistering an info object and its sender
     * @param name = name of info object
     */
    function unregister(name) {
        delete info[name];
        delete senders[name];
    }

    /**
     * callback that is return to a registered info object.
     * it should call it when something changes concerning the state of the scope
     * when called, it determines the general state of all info objects and
     * if not in edit state, calling the notify function
     */
    function update() {
        var generalState = 'valid';
        for (var key in info) {
            var infoState = info[key].state;
            if ((infoState === 'edit' || infoState === 'loading') && generalState !=='error') {
                generalState = 'edit';
            }
            if (infoState === 'invalid' && generalState === 'valid') {
                generalState = 'invalid';
            }
            if (infoState === 'error') {
                generalState = 'error';
                break;
            }
        }
        notifyListeners(generalState);
    }

    /**
     * notifier for all registered listeners. all listeners are unregistered after
     * being called
     * @param state = general state of all info objects
     */
    function notifyListeners(state) {
        while(listeners.length > 0) {
            var listener = listeners.pop();
            if (angular.isFunction(listener)) {
                // in case of a callback, we call it with the general state
                listener.call(null, state);
            } else if (state === 'valid') {
                // this must be a deferred object and we resolve it with valid
                listener.resolve(state);
            } else {
                // this is also a deferred object, we reject it with the general state as value
                listener.reject(state);
            }

        }
    }

    /**
     * calling send will call each sender function of the registered info objects
     * to start saving the value if in edit mode. If not in edit mode, it should
     * call the update callback immediately
     *
     * The function returns a promise. When resolved or rejected, the value will be a
     * string, containing the state. In case of a resolved promise, the value of the state
     * is 'valid'. When the promise rejects, the value is either 'invalid' or 'error'
     *
     * @param listener = deprecated. Use the promise that is returned instead
     *
     */
    function synchronize(listener){
        if (listener === undefined) {
            listener =  $q.defer();
        }
        if (angular.isFunction(listener) || (angular.isObject(listener) && angular.isFunction(listener.resolve) && angular.isFunction(listener.reject))) {
            // adding the new listener to the array of listeners
            listeners.push(listener);
            // calling call registered sender callbacks, to send data if in edit mode
            for (var key in senders) {
                senders[key].call();
            }
            // we call the update function immediately in case no info objects are registered.
            update();
        } else  {
            throw new Error('unsupported listener. Providing a listener is deprecated. Please use the promise that is returned by synchronize()');
        }
        return listener.promise;
    }

    // Public API here
    return {
        info: info,
        register : register,
        unregister : unregister,
        synchronize: synchronize
    };
}]);
'use strict';

angular.module('ingComponents.feedback')
    .factory('ingFeedbackService', ['$resource', function ($resource) {

        var path = '/api/feedback-next';

        var resource =  $resource(path + '/items', {}, {
            insert: {
                method: 'POST',
                headers: {'Accept': 'application/json'},
                withCredentials: true
            }
        });

        var insert = function(data){
            return resource.insert(data).$promise;
        };

        return {
            insert: insert
        }

    }]);
'use strict';

/**
 * @ngdoc service
 * @name ingComponents.tan.service:ingTanErrorService
 * @requires propertyService
 *
 * @description
 * This factory translates the errorCode into a errorObject containing an errorObject.errorMessage and (optionally)
 * an errorObject.errorKey.
 *
 * The means parameter (sms/list, default:list) is necessary because some error messages are different for sms and list.
 *
 * The validateTan (true/false, default:false) parameter is necessary because only in the validation flow (not the initiation flow)
 * the errorCode (10) should return a tanvalidation message.
 *
 * TODO Errorcode 107 returns a MSG_Func_SuspendedAgreement_P_6, I think this is a bug but kept it to keep flow 100% the same.
 *
 */
angular.module('ingComponents.tan').factory('ingTanErrorService', ['propertyService', function (propertyService) {

    var messages = propertyService.properties('ingComponents.tan.errors');

    var getError = function (errorCode, means) {

        var errorObject;


        switch (errorCode) {
            case 0:
                errorObject = createErrorObject('MSG_Tech_Error');
                break;
            case 5:
                errorObject = createErrorObject('MSG_Func_NoAUMAId');
                break;
            case 6:
                errorObject = createErrorObject('MSG_Func_BlockedAgreement');
                break;
            case 7:
                errorObject = createErrorObject('MSG_Func_InactiveMeans');
                break;
            case 9:
                if (means === 'sms') {
                    errorObject = createErrorObject('MSG_Func_MaxNumberOfErrors_SMS');
                } else {
                    errorObject = createErrorObject('MSG_Func_MaxNumberOfErrors_Paper');
                }
                break;
            case 10:
                if (means === 'sms') {
                    errorObject = createErrorObject('labels_TXT_INGTAN_Tan_Validation_Failed_SMS');
                    errorObject.invalidTan = true;
                } else if (means === 'list'){
                    errorObject = createErrorObject('labels_TXT_INGTAN_Tan_Validation_Failed_LIST');
                    errorObject.invalidTan = true;
                }
                else {
                    errorObject = createErrorObject('MSG_Tech_Error');
                }
                break;
            case 101:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_1');
                break;
            case 102:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_2');
                break;
            case 103:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_3');
                break;
            case 104:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_4');
                break;
            case 105:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_5');
                break;
            case 106:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_6');
                break;
            case 107:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_7');
                break;
            case 108:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_8');
                break;
            case 109:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_9');
                break;
            case 110:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_P_10');
                break;
            case 201:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_1');
                break;
            case 202:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_2');
                break;
            case 203:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_3');
                break;
            case 204:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_4');
                break;
            case 205:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_5');
                break;
            case 206:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_6');
                break;
            case 207:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_7');
                break;
            case 208:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_8');
                break;
            case 209:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_9');
                break;
            case 210:
                errorObject = createErrorObject('MSG_Func_SuspendedAgreement_Z_10');
                break;
            default :
                errorObject = createErrorObject('MSG_Tech_Error');
                break;
        }
        return errorObject;
    };

    var getDefaultErrorMessage = function () {
        return messages.MSG_Tech_Error;
    };

    function createErrorObject(messageKey) {
        var errorObject = {};
        errorObject.errorMessage = messages[messageKey];
        errorObject.errorKey = messageKey;
        return errorObject;
    }

    return {
        getError: getError,
        getDefaultErrorMessage: getDefaultErrorMessage
    };

}]);

'use strict';

/**
 * @ngdoc service
 * @name ingComponents.tan.service:ingTanResourceService
 * @requires $resource
 *
 * @description
 * This factory handles the REST communication for the ING Tan module
 */
angular.module('ingComponents.tan').factory('ingTanResourceService', ['$resource' , function ($resource) {

    var resource = $resource('/api/authorization/:action', {}, {
        initiate: {method: 'POST', params: {action: 'initiate'},isArray: false},
        validate: {method: 'POST', params: {action: 'validate'},isArray: false}
    });

    var initiate = function(data){
        return resource.initiate(data).$promise;
    };

    var validate = function(data){
        return resource.validate(data).$promise;
    };

    return {
        initiate: initiate,
        validate: validate
    };

}]);

'use strict';

/**
 * @ngdoc service
 * @name ingComponents.tan.service:ingTanService
 * @requires ingTanResourceService, ingTanErrorService, $q
 *
 * @description
 * This factory handles the logic between the controller on one side and the resource and error service
 * on the other side.
 *
 * The directive expects in success-flow for initiateTan a response with:
 *  - result.means (sms/list)
 *  - result.challenge
 *
 *  The directive expects in success-flow for validateTanResponse a response with:
 *  - result.newList (false/true).
 *
 *  On error flows of both methods the ingTanErrorService is used to try to parse the errorId in a errorMessage,
 *  when this cannot be done a generic default message is resolved.
 *
 */
angular.module('ingComponents.tan').factory('ingTanService', ['ingTanResourceService', 'ingTanErrorService', '$q', function (ingTanResourceService, ingTanErrorService, $q) {


    var initiateTan = function(deliveryMode, authid){

        var defer = $q.defer();

        ingTanResourceService.initiate({ deliveryMode: deliveryMode, authid: authid}).then(
            function success(result) {
                // on success: directly return the result of the resource service
                defer.resolve(result);
            },
            function error(result){
                // on error: try to resolve errorCode via ingTanErrorService, otherwise return default error.
                var errorObject = {};

                if (result.data.errorId && result.data.errorId.length > 0) {
                    errorObject = ingTanErrorService.getError(parseInt(result.data.errorId, 10));
                } else {
                    errorObject.errorMessage = ingTanErrorService.getDefaultErrorMessage();
                }

                defer.reject(errorObject);
            });
        return defer.promise;
    };

    var validateTanResponse = function(deliveryMode, authid, tanResponse, means){
        var defer = $q.defer();

        ingTanResourceService.validate({authid: authid, authcode: tanResponse, deliveryMode: deliveryMode}).then(
            function success(result) {
                // on success: when challenge and result are returned this means the tan is not valid.
                if (result.challenge && result.means){
                    result.invalidTan = true;
                }
                defer.resolve(result);
            },
            function error(result){
                // on error: try to resolve errorCode via ingTanErrorService, otherwise return default error.
                var errorObject = {};

                if (result.data.errorId && result.data.errorId.length > 0) {
                    errorObject = ingTanErrorService.getError(parseInt(result.data.errorId, 10), means);
                } else {
                    errorObject.errorMessage = ingTanErrorService.getDefaultErrorMessage();
                }

                defer.reject(errorObject);
            });
        return defer.promise;
    };

    return {
        initiateTan: initiateTan,
        validateTanResponse: validateTanResponse
    };

}]);

'use strict';

angular.module('ingComponents.servicePhone').factory('servicePhoneService', ['$resource', function ($resource) {
    function get(url, success) {
        return $resource(url).get({},
            function(data){
                // success
                data.state = data.phoneNumberMasked ? (data.valid ? 'valid' : 'error') : 'empty';
                success.call(null,data);
            },
            function(data) {
                // error
                if (data.status === 404) {
                    // not found
                    data.state = 'empty';
                    success.call(null, data);
                } else {
                    // some sort of real error
                    data.state = 'error';
                    success.call(null, data);
                }
            });
    }

    function save(url, data, success){
        return $resource(url).save(data, function(){
            data.state = 'valid';
            success.call(null, data);
        },function(response){
            // validation of the phone number is done in the backend. Status 400 means the new phone number is invalid, so we return state 'edit'.
            data.state = response.status === 400 ? 'edit' : 'error';
            success.call(null, data);
        });
    }

    // Public API here
    return {
        get : get,
        save: save
    };

}]);

angular.module('ingComponents').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partials/ingEmail.html',
    "<div class=\"box\"><div ing-email-new url=\"{{url}}\"></div></div>"
  );


  $templateCache.put('partials/ingServicePhone.html',
    "<div class=\"box\"><div ing-service-phone-new url=\"{{url}}\"></div></div>"
  );

}]);

