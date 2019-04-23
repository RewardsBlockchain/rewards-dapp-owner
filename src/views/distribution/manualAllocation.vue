<template>
  <div>
    <b-row>
      <b-col md="6">
        <div class="form-group">
          <label class="control-label">Recipient Address</label>
          <input type="text" class="form-control" v-model="address"/>
        </div>
      </b-col>
      <b-col md="3">
        <div class="form-group">
          <label class="control-label">Token Amount</label>
          <input type="text" class="form-control" v-model="amount"/>
          <span class="form-control-right-box">RWRDs</span>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="addToList">Add List >></b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="9">
        <div class="form-group">
          <label class="control-label">Batch Input <span class="text-muted">(ex. 0xE1090619B38884e8F324BfED806B46a9a3f622F5  1000)</span></label>
          <b-form-textarea id="batch-allocation-input" v-model="textInput"
                           placeholder=""
                           :rows="3">
          </b-form-textarea>
        </div>
      </b-col>
      <b-col md="3">
        <b-button class="btn btn-success mt-b" @click="addBatchToList">Add List >></b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "manualAllocation",

    data() {
      return {
        address: null,
        amount: null,
        textInput: '',
      }
    },
    methods: {
      addToList() {
        Vue.$emit('addManualAlloc', {
          address: this.address,
          amount: this.amount,
        });
      },
      addBatchToList() {
        let text = this.textInput;
        let result = this.parseTextInput(text);
        if (result) {
          Vue.$emit('addManualBatchAlloc', {
            addresses: result.addresses,
            amounts: result.amounts,
          });
        } else {
          swal({
            title: "Parse Error",
            text: `Please check your input addresses and amounts.`,
            icon: "warning",
          });
        }
      },
      parseTextInput(text) {
        let lines = text.split('\n');
        let addresses = [];
        let amounts = [];
        if (lines.length > 0) {
          for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim().split(' ');
            line = line.filter((item) => {
              return item !== '';
            });
            if (line.length !== 2) {
              return false;
            } else {
              addresses.push(line[0]);
              amounts.push(line[1]);
            }
          }
          return {addresses: addresses, amounts: amounts}
        }
        return false;
      },
    }
  }
</script>

<style scoped>
</style>
