'use strict';
angular.module('xbrlImport')
    .factory('dataService', function () {
        var data = {
            omzet: {
                'label' :'Omzet',
                'br1'   : 403313
            } ,
            'kostprijsInkoop': {
                'label': 'Kostprijs van de omzet (inkoop)',
                'br1': 23000
            },
            'brutomarge': {
                'label': 'Brutomarge',
                'br1': 0
            },
            'personeelskosten': {
                'label': 'Personeelskosten',
                'br1': 185297
            },
            'afschrijvingen': {
                'label': 'Afschrijvingen',
                'br1': 27111
            },
            'overigeKosten': {
                'label': 'Overige kosten',
                'br1': 111000
            },
            'rentelasten': {
                'label': 'Rentelasten',
                'br1': 11422
            },
            'resultaat': {
                'label': 'Resultaat',
                'br1': 45483
            }

    };

        return {
            'getData': function () {
                return data;
            }
        }
    });


