import Registry from "winreg"

const vmRegPath = [
  "SOFTWARE",
  "WOW6432Node",
  "Microsoft",
  "Windows",
  "CurrentVersion",
  "Uninstall",
  "VB:Voicemeeter {17359A74-1236-5467}",
].join("\\")

export const getDLLPath = (): Promise<string> =>
  new Promise(res => {
    const reg = new Registry({
      hive: Registry.HKLM,
      key: `\\${vmRegPath}`,
    })
    reg.get("UninstallString", (err, item) => {
      if (err) throw err

      const path = item.value
      res(path.slice(0, path.lastIndexOf("\\")))
    })
  })
