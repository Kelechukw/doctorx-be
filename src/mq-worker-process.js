import cp from "child_process";

export default () => {
  cp.fork("./src/infrastructures/queue/worker");
};
