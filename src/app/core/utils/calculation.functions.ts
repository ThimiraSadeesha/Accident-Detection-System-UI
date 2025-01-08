export const ttlToMilliseconds = (ttl: string) => ttl.split('d').map(
    step1 => !isNaN(Number(step1)) ? Number(step1) * 24 * 60 * 60 * 1000 : step1.split('h').map(
      step2 => !isNaN(Number(step2)) ? Number(step2) * 60 * 60 * 1000 : step2.split('m').map(
        step3 => !isNaN(Number(step3)) ? Number(step3) * 60 * 1000 : step3.split('s').map(
          step4 => !isNaN(Number(step4)) ? Number(step4) * 1000 : step4.split('u').map(
            step5 => !isNaN(Number(step5)) ? Number(step5) * 1000 : 0
          ).reduce((partialSum, a) => partialSum + a, 0)
        ).reduce((partialSum, a) => partialSum + a, 0)
      ).reduce((partialSum, a) => partialSum + a, 0)
    ).reduce((partialSum, a) => partialSum + a, 0)
  )[0] ?? 0
  