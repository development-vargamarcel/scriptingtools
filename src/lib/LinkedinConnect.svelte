<script>
  const steps = [
    {
      name: "clickOnConnect",
      waitTimeBeforeClick: 1000,
      waitTimeAfterClick: 1000,
      waitTimeBetweenClicks: 1000,
      waitTimeAfterrevealingMoreSelectors: 1000,
      actionToRunBeforeClick: ``,
      actionToRunAfterClick: ``,
      shouldRerunUntilNoSelectorsFound: true,
      forceStopMethod: `exists:[aria-label="limit reached"]`,
      selectorsToClick: ['[aria-label="Connect"]'],
      revealMoreSelectorsMethod: `click:[aria-label="Next"]/jump:bottomOfPage`,
    },
    {
      name: "clickOnObstacles",
      waitTimeBeforeClick: 1000,
      waitTimeAfterClick: 1000,
      waitTimeBetweenClicks: 1000,
      actionToRunBeforeClick: ``,
      actionToRunAfterClick: ``,
      shouldRerunUntilNoSelectorsFound: true,
      selectorsToClick: [
        '[aria-label="Send now"]',
        '[aria-label="Send without a note"]',
      ],
    },
  ];

  let waitTimeAfterClickOnSend = 1000;
  let waitTimeAfterClickOnTarget = 1000;
  let waitTimeAfterClickOnNextPage = 2000;
  let maxNumberOfTargetBatches = 1;
  let maxNumberOfTargetsToClickPerBatch = 99;
  let errorInPercentage = 70; //used for some randomness in the clicking
  let obstacleElementsSelectorsAsText = `
[aria-label="Send without a note"]
[aria-label="Send now"]
[aria-label="Got it"]
.ip-fuse-limit-alert__header.t-20.t-black.ph4::reload`;
  const injectCode = () => {
    ///;
    const doTheSteps = (
      waitTimeAfterClickOnSend,
      waitTimeAfterClickOnTarget,
      waitTimeAfterClickOnNextPage,
      maxNumberOfTargetBatches,
      maxNumberOfTargetsToClickPerBatch,
      errorInPercentage,
      obstacleElementsSelectorsAsText,
      steps
    ) => {
      const runStep = (step) => {
        console.log(step);
        const {
          name,
          waitTimeBeforeClick,
          waitTimeAfterClick,
          waitTimeBetweenClicks,
          waitTimeAfterrevealingMoreSelectors,
          actionToRunBeforeClick,
          actionToRunAfterClick,
          shouldRerunUntilNoSelectorsFound,
          forceStopMethod,
          selectorsToClick,
          revealMoreSelectorsMethod,
        } = step;
      };

      //
      //

      steps.forEach((step) => {
        runStep(step);
      });
    };

    const runMyCode = (
      waitTimeAfterClickOnSend,
      waitTimeAfterClickOnTarget,
      waitTimeAfterClickOnNextPage,
      maxNumberOfTargetBatches,
      maxNumberOfTargetsToClickPerBatch,
      errorInPercentage,
      obstacleElementsSelectorsAsText,
      steps
    ) => {
      ////////
      const wrapedLogic = (
        waitTimeAfterClickOnSend,
        waitTimeAfterClickOnTarget,
        waitTimeAfterClickOnNextPage,
        maxNumberOfTargetBatches,
        maxNumberOfTargetsToClickPerBatch,
        errorInPercentage,
        obstacleElementsSelectorsAsText,
        steps
      ) => {
        //////
        const followTheSteps = (steps) => {
          steps.forEach((step) => {
            console.log(step);
          });
        };

        /////
        function addRelativeError(milliseconds, errorPercentage) {
          // Convert the percentage error into a decimal
          const errorDecimal = errorPercentage / 100;

          // Calculate the relative error amount
          const errorAmount = milliseconds * errorDecimal;

          // Generate a random sign (+ or -) to apply the error randomly
          const sign = Math.random() < 0.5 ? -1 : 1;

          // Apply the error amount to the original milliseconds
          const result = milliseconds + sign * errorAmount;

          // Return the final result, rounded to the nearest integer
          return Math.round(result);
        }
        function textToArray(text) {
          return text.split("\n");
        }
        const clickOnObstacles = () => {
          const obstacleElementsSelectors = textToArray(
            obstacleElementsSelectorsAsText
          );
          obstacleElementsSelectors
            .filter((element) => element !== "")
            .forEach((selector) => {
              const selectorAndMeaning = selector.split("::");

              const obstacleElement = document.querySelector(
                selectorAndMeaning[0]
              );
              if (!obstacleElement) {
                console.warn("no obstacle element found", selector);
                return;
              }
              if (selectorAndMeaning?.[1] === "reload") {
                location.reload();
              } else {
                obstacleElement.click();
              }
            });
        };
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
          //goToBottomOfPage();
          const nextElementClassName = "artdeco-button__text";
          const nextElementInnerText = "Next";
          const nextElement = [
            ...document.getElementsByClassName(nextElementClassName),
          ].find((item) => item.innerText === nextElementInnerText);
          if (!nextElement) {
            console.warn("no next element found");
            return;
          }
          nextElement.scrollIntoView();
          console.log("clicking on next page...");
          nextElement.click();
        };
        const goToBottomOfPage = () => {
          window.scrollTo(0, document.body.scrollHeight);
        };

        const className = "artdeco-button__text";
        const innerText = "Connect";
        const functionToRunAfterClickingOnTarget = clickOnObstacles;
        const clickOnTarget = (targetButtons, buttonIndex) => {
          const targetButton = targetButtons[buttonIndex];
          if (!targetButton) {
            console.warn("no target button found");
            return;
          }
          targetButton.scrollIntoView();
          console.log(
            `clicking on target button ${
              buttonIndex + 1
            } of ${targetButtons_length}...`
          );
          targetButton.click(); //!!!uncomment this line to actually click on the target buttons
        };
        const functionToRunToGetANewBatchOfTargetButtons = clickOnNextPage;
        const getTargetButtons = () => {
          return [...document.getElementsByClassName(className)].filter(
            (item) => item.innerText === innerText
          );
        };

        var targetButtons = getTargetButtons();
        let targetButtons_length = targetButtons.length;
        //console.log(`I found ${targetButtons_length} target buttons. ETA is ${targetButtons_length * (waitTimeAfterClickOnTarget + waitTimeAfterClickOnSend) / 1000} seconds.`)
        var allTargetsWereClicked = false;
        var batchNumber = 1;
        console.clear();
        const clickOnNextTarget = (targetButtons, buttonIndex) => {
          allTargetsWereClicked = false;
          console.log({ targetButtons, buttonIndex, targetButtons_length });
          if (
            !(
              buttonIndex < targetButtons_length &&
              buttonIndex < maxNumberOfTargetsToClickPerBatch
            )
          ) {
            targetButtons = getTargetButtons();
            targetButtons_length = targetButtons.length;
            buttonIndex = 0;
            console.log("refetched buttons", {
              targetButtons,
              buttonIndex,
              targetButtons_length,
            });
          }

          if (
            buttonIndex < targetButtons_length &&
            buttonIndex < maxNumberOfTargetsToClickPerBatch
          ) {
            clickOnTarget(targetButtons, buttonIndex);
            setTimeout(
              () => {
                functionToRunAfterClickingOnTarget();
                setTimeout(
                  () => {
                    clickOnNextTarget(targetButtons, buttonIndex + 1);
                  },
                  addRelativeError(waitTimeAfterClickOnSend, errorInPercentage)
                );
              },
              addRelativeError(waitTimeAfterClickOnTarget, errorInPercentage)
            );
            return;
          }
          batchNumber++;
          if (batchNumber <= maxNumberOfTargetBatches) {
            functionToRunToGetANewBatchOfTargetButtons();
            targetButtons = getTargetButtons();
            targetButtons_length = targetButtons.length;
            //console.clear();
            console.info(
              `Getting new batch of targets:${batchNumber}/${maxNumberOfTargetBatches} `
            );
            setTimeout(
              () => {
                clickOnNextTarget(targetButtons, 0);
              },
              addRelativeError(waitTimeAfterClickOnNextPage, errorInPercentage)
            );
          } else {
            //  console.clear();
            console.log("I am done. All targets were clicked.");
          }
          return;
        };

        clickOnNextTarget(targetButtons, 0);
      };
      /////////

      console.log(
        waitTimeAfterClickOnSend,
        waitTimeAfterClickOnTarget,
        waitTimeAfterClickOnNextPage,
        maxNumberOfTargetBatches,
        maxNumberOfTargetsToClickPerBatch,
        errorInPercentage,
        obstacleElementsSelectorsAsText,
        steps
      );
      wrapedLogic(
        waitTimeAfterClickOnSend,
        waitTimeAfterClickOnTarget,
        waitTimeAfterClickOnNextPage,
        maxNumberOfTargetBatches,
        maxNumberOfTargetsToClickPerBatch,
        errorInPercentage,
        obstacleElementsSelectorsAsText,
        steps
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
          errorInPercentage,
          obstacleElementsSelectorsAsText,
          steps,
        ],
        func: runMyCode,
        //func: doTheSteps,
      });
    };
    setUp();
  };
</script>

<div class="card card-compact glass overflow-auto">
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
        <span class="label-text">waitTimeAfterClickOnSend</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="waitTimeAfterClickOnSend"
        bind:value={waitTimeAfterClickOnSend}
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
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">errorInPercentage</span>
      </label>
      <input
        type="number"
        class="input input-primary input-xs"
        placeholder="errorInPercentage"
        bind:value={errorInPercentage}
      />
    </div>
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">obstacleElementsSelectorsAsText</span>
      </label>
      <textarea
        class="input input-primary input-xs"
        placeholder="obstacleElementsSelectorsAsText"
        bind:value={obstacleElementsSelectorsAsText}
      />
    </div>
  </div>

  <button class="btn btn-primary normal-case mt-8" on:click={injectCode}>
    Start clicking
  </button>

  <div class="divider" />

  <button class="btn btn-primary normal-case mt-8" on:click={injectCode}>
    Start clicking custom flow
  </button>
</div>
