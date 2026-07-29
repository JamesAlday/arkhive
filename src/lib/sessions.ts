export function buildSessions(sessions: any) {
    const ordered = sessions.sort(
        (a, b) => a.data.session - b.data.session
    );
    
    let running = 0;
    
    const labels = [];
    const sessionXP = [];   
    const runningXP = [];
    
    for (const session of ordered) {
        labels.push(session.data.session);
        sessionXP.push(session.data.xp.each);
        running += session.data.xp.each;
        runningXP.push(running);
    }

    return {
        ordered: ordered,
        labels: labels,
        sessionXP: sessionXP,
        runningXP: runningXP
    }
}