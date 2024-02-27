class AddressInput {
    constructor(el) {
        this.parent = el;
        this.mapEl = el.querySelector('.js-input-map');
        this.input = el.querySelector('.address-input__target > input');

        this.map = null;
        this.suggest = null;

        this.init();
    }

    setAddressValue = (value) => {
        if (this.input) {
            this.input.value = value;
            this.input.dispatchEvent(new Event('change'));
        }
    }

    addMapEventListeners() {
        this.map.events.add('click', (e) => {
            const coords = e.get('coords');

            ymaps.geocode(coords, {
                results: 1
            }).then((res) => {
                const firstGeoObject = res.geoObjects.get(0);

                this.setAddressValue(firstGeoObject.getAddressLine());
            })
        });

        const map = this.map;
        this.suggest.events.add('select', function (evt) {
            const q = evt.get('item').value;
            ymaps.geocode(q,{results:1}).then(
                function(res) {
                    const GeoObj = res.geoObjects.get(0);
                    const coords = GeoObj.geometry.getCoordinates();
                    map.setCenter(coords).Redraw();
                }
            );
        });

    }

    initMap = () => {
        this.map = new ymaps.Map(this.mapEl, {
            center: [55.764094, 37.617617],
            zoom: 11
        }, {
            balloonMaxWidth: 200,
            searchControlProvider: 'yandex#search'
        });

        this.suggest = new ymaps.SuggestView(this.input);

        this.suggest.events.add(['select'], (e) => {
            this.setAddressValue(e.originalEvent.item.value);
        })

        this.addMapEventListeners();
    }

    init() {
        if (this.mapEl) {
            ymaps.ready(this.initMap);
        }
    }
}

export default AddressInput;