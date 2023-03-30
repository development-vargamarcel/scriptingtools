<script>
  //
  var tab_title = "";
  var tab;

  //
  $: console.log({ tab });
  console.log("hello from linkedin connect");
  let waitTimeAfterClickOnSend = 1000;
  let waitTimeAfterClickOnTarget = 200;
  let waitTimeAfterClickOnNextPage = 2000;
  let maxNumberOfTargetBatches = 4;
  let maxNumberOfTargetsToClickPerBatch = 3;
  //development.vargamarcel@gmail.com
  const clickOnSend = () => {
    const sendElement = document.querySelector('[aria-label="Send now"]');
    if (!sendElement) {
      console.warn("no send element found");
      return;
    }
    sendElement.click();
  };
  const clickOnNextPage = () => {
    const nextElementClassName = "artdeco-button__text";
    const nextElementInnerText = "Next";
    const nextElement = [
      ...document.getElementsByClassName(nextElementClassName),
    ].find((item) => item.innerText === nextElementInnerText);
    if (!nextElement) {
      console.warn("no next element found");
      return;
    }
    nextElement.click();
  };

  const className = "artdeco-button__text";
  const innerText = "Connect";

  const functionToRunAfterClickingOnTarget = clickOnSend;
  const clickOnTarget = (targetButtons, buttonIndex) => {
    const targetButton = targetButtons[buttonIndex];
    if (!targetButton) {
      console.warn("no target button found");
      return;
    }
    console.log(
      `clicking on target button ${
        buttonIndex + 1
      } of ${targetButtons_length}...`
    );
    targetButton.click(); //!!!uncomment this line to actually click on the target buttons
  };
  const functionToRunToGetANewBatchOfTargetButtons = clickOnNextPage;
  const getTargetButtons = () =>
    [...document.getElementsByClassName(className)].filter(
      (item) => item.innerText === innerText
    );

  var targetButtons = getTargetButtons();
  let targetButtons_length = targetButtons.length;
  //console.log(`I found ${targetButtons_length} target buttons. ETA is ${targetButtons_length * (waitTimeAfterClickOnTarget + waitTimeAfterClickOnSend) / 1000} seconds.`)
  var allTargetsWereClicked = false;
  var batchNumber = 1;
  console.clear();
  const clickOnNextTarget = (targetButtons, buttonIndex) => {
    allTargetsWereClicked = false;
    if (
      buttonIndex < targetButtons_length &&
      buttonIndex < maxNumberOfTargetsToClickPerBatch
    ) {
      clickOnTarget(targetButtons, buttonIndex);
      setTimeout(() => {
        functionToRunAfterClickingOnTarget();
        setTimeout(() => {
          clickOnNextTarget(targetButtons, buttonIndex + 1);
        }, waitTimeAfterClickOnSend);
      }, waitTimeAfterClickOnTarget);
    } else {
      batchNumber++;
      if (batchNumber <= maxNumberOfTargetBatches) {
        functionToRunToGetANewBatchOfTargetButtons();
        console.clear();
        console.info(
          `Getting new batch of targets:${batchNumber}/${maxNumberOfTargetBatches} `
        );
        setTimeout(() => {
          clickOnNextTarget(targetButtons, 0);
        }, waitTimeAfterClickOnNextPage);
      } else {
        console.clear();
        console.log("I am done. All targets were clicked.");
      }
    }
  };
</script>

<div class="flex flex-col space-y-2">
  <input
    type="number"
    class="input input-primary"
    placeholder="waitTimeAfterClickOnSend"
    bind:value={waitTimeAfterClickOnSend}
  />
  <input
    type="number"
    class="input input-primary"
    placeholder="waitTimeAfterClickOnTarget"
    bind:value={waitTimeAfterClickOnTarget}
  />
  <input
    type="number"
    class="input input-primary"
    placeholder="waitTimeAfterClickOnNextPage"
    bind:value={waitTimeAfterClickOnNextPage}
  />
  <input
    type="number"
    class="input input-primary"
    placeholder="maxNumberOfTargetBatches"
    bind:value={maxNumberOfTargetBatches}
  />
  <input
    type="number"
    class="input input-primary"
    placeholder="maxNumberOfTargetsToClickPerBatch"
    bind:value={maxNumberOfTargetsToClickPerBatch}
  />

  <button
    class="btn btn-primary normal-case"
    on:click={() => {
      const aa = async () => {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["myscript.js"],
        });
      };
      aa();

      tab = "bbbbbb";

      clickOnNextTarget(targetButtons, 0);
    }}
  >
    Click on all targets
  </button>
  <div>
    {tab_title}
  </div>
  <div>
    {tab}
  </div>
</div>
