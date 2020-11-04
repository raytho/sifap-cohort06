const invoiceMx = {
  emitter: {
    name: "sifap",
    address: `
    José Azueta 203,
    Col. Puerto México,
    C.P. 32912,
    Coatzacoalcos, Veracruz,
    México
    `,
    fiscalId: "OGR029345FX8"
  },
  client: {
    name: "Cliente 2",
    address: "1234 Main Street",
    fiscalId: "IRX0242452DR3"
  },
  products: [
    {
      item: "TC 100",
      description: "Toner Cartridge",
      quantity: 2,
      unit: "Pieza",
      amount: 3000.12
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      unit: "Pieza",
      amount: 1000.11
    }
  ],
  currency: "MXN Peso Mexicano",
  subtotal: 8000.46,
  taxes: 1280.07,
  total: 9280.53,
  folio: 1234,
  logoUrl: "https://i.imgur.com/FjzAcjI.png",
  totalWithLetter: "NUEVE MIL DOSCIENTOS OCHENTA PESOS 00/100 MXN",
  fiscalFolio:"B1C48A08-56BF-4B3A-BE81-2D7500AC29DA",
  satCertNumber: "00001000000413073350",
  serialNumberCertEmiter: "00001000000500667306",
  dateOfCertification: "2020-10-26T15:20:15",
  certProvider: "SVT110323827",
  cfdiUse: "G03",
  wayToPay: "Efectivo",
  paymentMethod: "Pago en una sola exhibición",
  createdAt: "2020-10-26T15:07:29",
  expeditionPlace: "24118",
  digitalSingCfdi: "ZCDwrNgcG0bCgvVi8HN5pmPfIk/iyRCKnkwIKLox9uHOf14unlPuKv7OHU6uVpGDI+W0cGfkvAdxh8sBY6b7NmBwfvLq7CbYT088c6phJLm7zuiYJB+ngJ5o0v0Fs8QgBFIxn5quLf4739z3Zbe0J/4v2bAJg2oNp1qECq8w4e1dcIw14SxTGCtJDOfj9QPQOoOFdt6EpjG2544eKn4P1ljx9OGg0kt6w/CDDofvXGr93Zow3mg3yolW8FhlQny8xdX1YaQFDwrKmKEw6UGP6Nempt+mtRVJWQzvGZGD9iTaM6CdCfxfTpnmtCpZCF60KSy1nnYu+VUfGnaNGZMd2Q==",
  satDigitalSign: "hNl+BdleVrXeAMgtTeKADtcqjaSylq3FUjYUmDDhEnYVDEsBfEO/ZNkP0f7NtEA7o5lY9AIS5OXJU8HaojhKri63djPzoxHGBXDjYzvTIlUgpx0ZI3JhDz+qjbWLaTIOddQZ80ElCTyEToofbB4LPg845X/LMNIN3d2h8amVdxotF0/ZWIGF3x0JeEssest6VvJ5HNSQYD8bxR3/CXQKK2670husLzBXKAYY2Twucd22V4FCIRNaUAq80/+LtQRlvC1Zzv+3o5SPm2GevLVMN67iawr6nk3tRJyoN/pfjtmNLyqyk6bpBvIy+JwMO+upTc3z1DD9OP+PSsWwQbtLOQ==",
  originalChain: "||1.1|B1C48A08-56BF-4B3A-BE81-2D7500AC29DA|2020-10-26T15:20:15|SVT110323827|ZCDwrNgcG0bCgvVi8HN5pmPfIk/iyRCKnkwIKLox9uHOf14unlPuKv7OHU6uVpGDI+W0cGfkvAdxh8sBY6b7NmBwfvLq7CbYT088c6phJLm7zuiYJB+ngJ5o0v0Fs8QgBFIxn5quLf4739z3Zbe0J/4v2bAJg2oNp1qECq8w4e1dcIw14SxTGCtJDOfj9QPQOoOFdt6EpjG2544eKn4P1ljx9OGg0kt6w/CDDofvXGr93Zow3mg3yolW8FhlQny8xdX1YaQFDwrKmKEw6UGP6Nempt+mtRVJWQzvGZGD9iTaM6CdCfxfTpnmtCpZCF60KSy1nnYu+VUfGnaNGZMd2Q==|00001000000413073350||"

};

module.exports = invoiceMx;