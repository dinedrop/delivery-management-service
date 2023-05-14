import { KafkaConsumer, ConsumerConfig } from "@dinedrop/shared";
import { riderService } from "../rider";

const consumerConfig: ConsumerConfig = {
  brokers: ["my-cluster-kafka-bootstrap.kafka:9092"],
  groupId: "100",
};

const consumer = new KafkaConsumer(consumerConfig);

consumer.on("rider-registered", async (result) => {
  const value = result.value?.toString();
  if (value === undefined || value == "{}") return;
  try {
    const rider = JSON.parse(value);
    const newRider = await riderService.createRider(rider);
    console.log("new rider created: ", newRider);
  } catch (error) {
    console.error("Error processing message:", error);
  }
});

async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe(["rider-registered"]);
  await consumer.run();
}

export default runConsumer;
