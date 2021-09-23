Vue.component('geo-locations', {

    props: {
        value: {
            default: []
        },

    }


    ,

    data: function () {
        return {
            // temp item to hold new locations
            e: {},
            addDlg: false,
            eindex: null,
            locations: this.value.length ? this.value : [],


        }

    },


    mounted() {


    },
    computed : {
        eformValid(){
            if (this.e.latlng){
                if (this.e.latlng.lat && this.e.latlng.lng) {
                    return true;
                }
            }
            return false;
        }
    },

    watch: {
        value(val) {
            if (val && val.length) {
                this.locations = val;
            }
        },

        locations() {
            this.$emit('input', this.locations)
        }

    },

    methods: {

        newLocation(){
          this.e = {};

          this.addDlg = true;


        },
        saveLocation(){


            if (this.e.mode == 'edit') {
                this.modifyLocation();
            }
            else {
                this.addLocation();
            }

        },

        modifyLocation() {
            //preprocess
            this.e.lat = this.e.latlng.lat;
            this.e.lng = this.e.latlng.lng;

            this.locations[this.eindex] = this.e;
            this.addDlg = false;
            // reset edited item
            this.e = {};



        },

        addLocation() {
            this.e.lat = this.e.latlng.lat;
            this.e.lng = this.e.latlng.lng;

            this.locations.push(this.e);
            this.addDlg = false;
            // reset edited item
            this.e = {};


        },
        editLocation(item, index) {
            item.latlng = {lat: item.lat, lng: item.lng};
            this.e = item;

            this.eindex = index;
            this.addDlg = true;
            this.e.mode = 'edit';

        },



        removeLocation(i) {
            if (confirm('Are you sure?')) {
            this.locations.splice(i,1);
            }


        }
    },

    template: `
      <div>
      <v-card outlined color="grey lighten-3">
        <v-toolbar elevation="0">
          <v-toolbar-title>
            Geo Markers
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn @click="newLocation" fab x-small elevation="0" color="teal lighten-2">
            <v-icon color="white" dark>mdi-plus-circle</v-icon>
          </v-btn>
        </v-toolbar>


        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col v-for="(loc,i) in locations" :key="i" cols="12" md="4">
                <v-card elevation="0">
                  <v-card-text>
                    <v-chip small v-if="loc.type" class="grey lighten-3">{{ loc.type }}</v-chip>
                    <h4 class="pa-3 mb-2caption black--text">{{ loc.title }}</h4>
                    <div class="heading black--text"> <v-icon small left >mdi-map-marker</v-icon>
                      {{loc.lat.toFixed(4)}} , {{loc.lng.toFixed(4)}}</div>
                    
                    <div v-if="loc.comment" class="comments pa-3 mt-2" v-html="loc.comment">
                      
                    </div>
                    
                    
                  </v-card-text>
                  
                  <v-card-actions>
                    <v-btn
                        @click="editLocation(loc,i)"
                        x-small
                        fab
                        outlined
                        color="grey"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn
                    >
                    <v-btn
                        @click="removeLocation(i)"
                        x-small
                        fab
                        outlined
                        color="red lighten-3"
                    >
                      <v-icon>mdi-delete-sweep</v-icon>
                    </v-btn
                    >
                  </v-card-actions>

                </v-card>

              </v-col>
            </v-row>
          </v-container>


          <v-card>

          </v-card>


        </v-card-text>
      </v-card>
      <v-dialog v-if="addDlg" max-width="770" v-model="addDlg">
        <v-card elevation="0">
          <v-card-title>Add Geo Marker
            <v-spacer></v-spacer>
            <v-btn @click="addDlg=false" icon>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>


          <v-card-text >
            <div  class="d-flex px-5" style="column-gap: 20px">
            <v-text-field v-model="e.title" label="Title"></v-text-field>
            <v-select :items="geoLocationTypes" v-model="e.type" label="Type"></v-select>
                </div>
            <div class="px-5">
              <v-text-field v-model="e.comment" label="Comment"></v-text-field>
              
            </div>

          </v-card-text>
          <v-card-text>
            <geo-map v-model="e.latlng" map-height="300"></geo-map>
          </v-card-text>
          <v-card-actions class="pb-3">
            <v-spacer></v-spacer>
            <v-btn :disabled="!eformValid"  @click="saveLocation" width="220" color="primary">Save</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>

      </v-dialog>
      </div>
    `
})