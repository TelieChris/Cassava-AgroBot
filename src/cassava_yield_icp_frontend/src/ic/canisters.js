import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/cassava_yield_icp_backend";

const createActor = (canisterId) => {
  const agent = new HttpAgent({ host: "https://zwbmv-jyaaa-aaaab-qacaa-cai.icp0.io" });

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};

export { createActor };
