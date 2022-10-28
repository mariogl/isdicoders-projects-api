import axios from "axios";
import { IProject } from "../../types/interfaces";

const sonarService = async (projects: IProject[]) => {
  const getSonarFrontAPIURL = (project: IProject) =>
    `https://sonarcloud.io/api/measures/component?component=${project.sonarKey.front}&metricKeys=sqale_index,code_smells,bugs,vulnerabilities,security_hotspots,coverage`;
  const getSonarBackAPIURL = (project: IProject) =>
    `https://sonarcloud.io/api/measures/component?component=${project.sonarKey.back}&metricKeys=sqale_index,code_smells,bugs,vulnerabilities,security_hotspots,coverage`;

  const projectsFrontPromises: Promise<any>[] = [];
  const projectsBackPromises: Promise<any>[] = [];

  projects.forEach((project) => {
    if (project.sonarKey.front) {
      projectsFrontPromises.push(axios.get(getSonarFrontAPIURL(project)));
    }

    if (project.sonarKey.back) {
      projectsBackPromises.push(axios.get(getSonarBackAPIURL(project)));
    }
  });

  let projectsFrontMeasures: any;
  let projectsBackMeasures: any;

  if (projectsFrontPromises?.length) {
    projectsFrontMeasures = await Promise.all(projectsFrontPromises);
  }

  if (projectsBackPromises?.length) {
    projectsBackMeasures = await Promise.all(projectsBackPromises);
  }

  let debtFront: any;
  let codeSmellsFront: any;
  let bugsFront: any;
  let vulnerabilitiesFront: any;
  let coverageFront: any;
  let securityHotspotsFront: any;

  let debtBack: any;
  let codeSmellsBack: any;
  let bugsBack: any;
  let vulnerabilitiesBack: any;
  let coverageBack: any;
  let securityHotspotsBack: any;

  const resultProjects = projects.map((project, position) => {
    if (project.sonarKey.front) {
      const { measures: measuresFront } =
        projectsFrontMeasures[position].data.component;

      debtFront = measuresFront.find(
        (measure: any) => measure.metric === "sqale_index"
      ).value;

      codeSmellsFront = measuresFront.find(
        (measure: any) => measure.metric === "code_smells"
      ).value;

      bugsFront = measuresFront.find(
        (measure: any) => measure.metric === "bugs"
      ).value;

      vulnerabilitiesFront = measuresFront.find(
        (measure: any) => measure.metric === "vulnerabilities"
      ).value;

      coverageFront = measuresFront.find(
        (measure: any) => measure.metric === "coverage"
      )?.value;

      securityHotspotsFront = measuresFront.find(
        (measure: any) => measure.metric === "security_hotspots"
      ).value;
    }

    if (project.sonarKey.back) {
      const { measures: measuresBack } =
        projectsBackMeasures[position].data.component;

      debtBack = measuresBack.find(
        (measure: any) => measure.metric === "sqale_index"
      ).value;

      codeSmellsBack = measuresBack.find(
        (measure: any) => measure.metric === "code_smells"
      ).value;

      bugsBack = measuresBack.find(
        (measure: any) => measure.metric === "bugs"
      ).value;

      vulnerabilitiesBack = measuresBack.find(
        (measure: any) => measure.metric === "vulnerabilities"
      ).value;

      coverageBack = measuresBack.find(
        (measure: any) => measure.metric === "coverage"
      )?.value;

      securityHotspotsBack = measuresBack.find(
        (measure: any) => measure.metric === "security_hotspots"
      ).value;
    }

    let transformedProject;

    if (project.sonarKey.front || project.sonarKey.back) {
      transformedProject = {
        ...project,
        id: project.id,
      };
    }

    if (project.sonarKey.front) {
      transformedProject = {
        ...transformedProject,
        sonarInfoFront: {
          debt: debtFront,
          codeSmells: codeSmellsFront,
          bugs: bugsFront,
          vulnerabilities: vulnerabilitiesFront,
          securityHotspots: securityHotspotsFront,
          coverage: coverageFront,
        },
      };
    }

    if (project.sonarKey.back) {
      transformedProject = {
        ...transformedProject,
        sonarInfoBack: {
          debt: debtBack,
          codeSmells: codeSmellsBack,
          bugs: bugsBack,
          vulnerabilities: vulnerabilitiesBack,
          securityHotspots: securityHotspotsBack,
          coverage: coverageBack,
        },
      };
    }

    delete transformedProject?.id;

    return transformedProject;
  });
  return resultProjects;
};

export default sonarService;
