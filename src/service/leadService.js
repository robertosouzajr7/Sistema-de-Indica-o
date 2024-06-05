import Lead from "../models/LeadModel.js";
export const createLeadService = async (LeadData) => {
  const newLead = new Lead(LeadData);
  await newLead.save();
  return newLead;
};

export const getLeadsService = async () => {
  const newLead = await Lead.find();
  return newLead;
};

export const getLeadByIdService = async (id) => {
  const newLead = await Lead.findById(id);
  return newLead;
};

export const getLeadByEmailService = async (email) => {
  const newLead = await Lead.findOne({ email });
  return newLead;
};
