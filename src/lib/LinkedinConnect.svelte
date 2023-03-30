<script>
  let waitTimeAfterClickOnSend = 1000;
  let waitTimeAfterClickOnTarget = 200;
  let waitTimeAfterClickOnNextPage = 2000;
  let maxNumberOfTargetBatches = 4;
  let maxNumberOfTargetsToClickPerBatch = 99;
</script>

<div class="card card-compact glass">
  <div class="flex space-x-2 pb-2 mx-auto">
    <p class="badge badge-primary mx-auto text-lg">Linkedin</p>
    <p class="badge badge-accent mx-auto text-lg">connect</p>
  </div>
  <div class="divider" />
  <div class="flex flex-col space-y-2">
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">waitTimeAfterClickOnTarget</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="waitTimeAfterClickOnTarget"
        bind:value={waitTimeAfterClickOnTarget}
      />
    </div>

    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">waitTimeAfterClickOnTarget</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="waitTimeAfterClickOnTarget"
        bind:value={waitTimeAfterClickOnTarget}
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">waitTimeAfterClickOnNextPage</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="waitTimeAfterClickOnNextPage"
        bind:value={waitTimeAfterClickOnNextPage}
      />
    </div>
    <div class="form-control w-full max-w-xs mt">
      <label class="label mt-6">
        <span class="label-text">maxNumberOfTargetBatches</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="maxNumberOfTargetBatches"
        bind:value={maxNumberOfTargetBatches}
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">maxNumberOfTargetsToClickPerBatch</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="maxNumberOfTargetsToClickPerBatch"
        bind:value={maxNumberOfTargetsToClickPerBatch}
      />
    </div>
  </div>

  <button
    class="btn btn-primary normal-case mt-8"
    on:click={() => {
      ///;
      const runMyCode = (
        waitTimeAfterClickOnSend,
        waitTimeAfterClickOnTarget,
        waitTimeAfterClickOnNextPage,
        maxNumberOfTargetBatches,
        maxNumberOfTargetsToClickPerBatch
      ) => {
        ////////
        const wrapedLogic = (
          waitTimeAfterClickOnSend,
          waitTimeAfterClickOnTarget,
          waitTimeAfterClickOnNextPage,
          maxNumberOfTargetBatches,
          maxNumberOfTargetsToClickPerBatch
        ) => {
          //development.vargamarcel@gmail.com
          const clickOnSend = () => {
            const sendElement = document.querySelector(
              '[aria-label="Send now"]'
            );
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
            console.log("clicking on next page...");
            nextElement.click();
          };
          const goToBottomOfPage = () => {
            window.scrollTo(0, document.body.scrollHeight);
          };
          goToBottomOfPage();
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
            goToBottomOfPage();
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

          clickOnNextTarget(targetButtons, 0);
        };
        /////////

        console.log(
          waitTimeAfterClickOnSend,
          waitTimeAfterClickOnTarget,
          waitTimeAfterClickOnNextPage,
          maxNumberOfTargetBatches,
          maxNumberOfTargetsToClickPerBatch
        );
        wrapedLogic(
          waitTimeAfterClickOnSend,
          waitTimeAfterClickOnTarget,
          waitTimeAfterClickOnNextPage,
          maxNumberOfTargetBatches,
          maxNumberOfTargetsToClickPerBatch
        );
      };
      const setUp = async () => {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },

          args: [
            waitTimeAfterClickOnSend,
            waitTimeAfterClickOnTarget,
            waitTimeAfterClickOnNextPage,
            maxNumberOfTargetBatches,
            maxNumberOfTargetsToClickPerBatch,
          ],
          func: runMyCode,
        });
      };
      setUp();
    }}
  >
    Start clicking
  </button>
</div>
