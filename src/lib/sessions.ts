import type uPlot from "uplot";

export function getSessionXPSeries(sessions: any, count = 3): uPlot.AlignedData {
    const sessionNumbers = sessions.map((s: any) => s.data.session);
    const xpValues = sessions.map((s: any) => s.data.xp.each);
    
    return [
        [...sessionNumbers],
        [...xpValues]
    ];
}

export function getRunningXP(sessions: any) {
    const runningXP = [];
    let runningTotal = 0;

    for (const session of sessions) {
        runningTotal = runningTotal + session.data.xp.each;

        let row = {
            session: session.data.session,
            xpEach: session.data.xp.each,
            sessionTotal: session.data.xp.total,
            runningTotal: runningTotal,
            level: session.data.level.start,
            title: session.data.title
        }
        runningXP.push(row);
    }
    return runningXP;
}

export function getRecentXPSeries(runningXP: any) {
    const sessionNum = [];
    const runningTotal = [];

    const sessions = runningXP.slice(-3);

    for (const session of sessions) {
        sessionNum.push(session.session);
        runningTotal.push(session.runningTotal);
    }

    return [
        sessionNum,
        runningTotal
    ]
}

function getSessionsPerLevel(sessions: any) {
    const sessionsPerLevel: Record<number, number> = {};

    for (const session of sessions) {
        const level = session.data.level.start;
        if (!sessionsPerLevel[level]) {
            sessionsPerLevel[level] = 0;
        }
        sessionsPerLevel[level]++;
    }

    return sessionsPerLevel;
}

export function getSessionsPerLevelSeries(sessionData: any): uPlot.AlignedData {
    const sessionsPerLevel = getSessionsPerLevel(sessionData);
    
    const levels: any[] = [];
    const sessions: any[] = [];

    Object.entries(sessionsPerLevel).forEach(([level, count]) => {
        levels.push(parseInt(level));
        sessions.push(count ? count : null);
    })

    return [
        levels,
        sessions
    ];
}